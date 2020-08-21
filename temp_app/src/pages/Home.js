
import React, { Component } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import { CreateTable } from '../components/Table.js'
import API from '../classes/API.js';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import ModalGeneral from '../components/ModalGeneral.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

const HomeStyle = styled.div`
    .home-title {
        text-align: center;
        padding: 16px 0px;
    }
    .table {
        width: 90%;
        margin: 0 auto;
    }
    #home-inputgrp {
        width: 90%;
        margin: 0 auto;
    }
    .interval-active-red {
        background-color: #e91e63;
        color: white;
    }
    .interval-active-green {
        background-color: #4caf50;
        color: white;
    }
`;

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;
        this.api = new API()
        
        this.state = {
            loggedIn: 0,
            intervalTime: '',
            intervalActive: false,
            showModal: false,
            modalTitle: '',
            modalInfo: '',
            dataSensors: [
                [1, "Sensor1", 'Hall', 23.7, 'C'],
                [2, 'Sensor2', 'Dinner', 33.7, 'F'],
                [3, 'Sensor3', 'Bedroom', 21.7, 'C'],
            ],
            dataRelays: [
                [1, 'Under construction', 'Under construction', 'Under construction']
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleButtonStartReading = this.handleButtonStartReading.bind(this);
        this.handleButtonStopReading = this.handleButtonStopReading.bind(this);
        this.onModalInfoClose = this.onModalInfoClose.bind(this);

    }

    componentDidMount() {
        this.mounted = true;

        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            this.api.addToken(jwt)
        }

        const lsLoggedIn = localStorage.getItem('loggedIn');
        if (lsLoggedIn === 1) {
            this.setState({
                loggedIn: 1
            })
        }
        
        // Update table for sensors
        this.api.getAllSensor()
        .then(result => {
            let data = []
            if (result.status) {
                data = result.data
                data.forEach(element => {
                    element.splice(5,2)
                    element.splice(2,1)
                });

                // Get temperature for each sensor
                data.forEach(element => {
                    this.api.readTemperature(element[0])
                    .then(result => {
                        if (result.status) {
                            element.splice(3, 0, result.data.temperature)
                        }
                    })
                });
            }
            return data
        })
        .then(data => {
            // Update table
            console.log(data)
            this.setState({
                dataSensors: data
            });
        })
    }

    componentWillUnmount() {
        this.mounted = false;
        this.api.abort();
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            // Only update if props changed
            if (this.props.stateLogin !== prevProps.stateLogin) {
                console.log("We are going to update Home page")
                this.setState({
                    loggedIn: this.props.stateLogin
                })
            }
        }
    }

    handleChange(event) {
        const target = event.target
        const name = target.name;
        let value = '';
        switch (name) {
            case 'intervalTime':
                const patt = /^\d+/;
                if (patt.test(target.value)) {
                    value = patt.exec(target.value);
                }
                break;
            default:
                console.error("Error - handleChange got default value")
        }
        this.setState({
            [name]: value
        })
    }

    handleButtonStartReading() {
        
        // Check time
        if (this.state.intervalTime === '') {
            this.setState({
                showModal: true,
                modalTitle: "Wrong intervaltime",
                modalInfo: "Intervaltime is either 0 or not set. Please enter a digital value"
            })
        } else {
            // Start the measure all temperature sensors
            const secs = this.state.intervalTime * 60 * 60
            this.api.startMeasure(secs)
            .then(result => {
                if (result.status) {
                    console.log("Start the interval reading")
                    this.setState({
                        intervalActive: true
                    })
                } else {
                    console.log("Something went wrong when startin the eventserver")
                }
            })
        }

    }

    handleButtonStopReading() {
        console.log("Stop button has been psuhed")
        this.api.stopMeasure()
        .then(result => {
            if (result.status) {
                console.log("Stop theh threadpool")
                this.setState({
                    intervalActive: false
                })
            } else {
                console.log("Something went wrong when stoping the threadpool")
            }
        })
    }

    onModalInfoClose(value) {
        console.log("Close info box")
        this.setState({
            showModal: value,
            modalTitle: '',
            modalInfo: ''
        })
    }

    activeColor = (value) => {
        return value ? 'interval-active-green' : 'interval-active-red'
    }

    render() {
        
        const isLoggedIn = this.state.loggedIn
        let home;
        if (isLoggedIn === 1) {
            home = (
                <HomeStyle>
                <div className="home-container">
                    <h3 className="home-title">DS18B20 Temperature sensors</h3>
                    <Table striped bordered hover size="sm" className="table">
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Value</th>
                            <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CreateTable lst={this.state.dataSensors} />
                        </tbody>
                    </Table>
                    <h3 className="home-title">Temperature interval reading</h3>
                    <InputGroup className="mb-3" id="home-inputgrp">
                        <InputGroup.Prepend>
                            <Button name="startIntervalReading"
                                    variant="outline-secondary"
                                    className="home-button"
                                    onClick={this.handleButtonStartReading}>Start</Button>
                            <Button name="stopIntervalReading"
                                    variant="outline-secondary"
                                    className="home-button"
                                    onClick={this.handleButtonStopReading}>Stop</Button>
                        </InputGroup.Prepend> 
                        <FormControl
                            name="intervalTime" 
                            placeholder="Enter time in hours"
                            value={this.state.intervalTime}
                            onChange={this.handleChange} />
                        <InputGroup.Append>
                            <InputGroup.Text className={this.activeColor(this.state.intervalActive)}>Active</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>              
                    <h3 className="home-title">ON/OFF Relays</h3>
                    <Table striped bordered hover size="sm" className="table">
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CreateTable lst={this.state.dataRelays} />
                        </tbody>
                    </Table>
                    <ErrorBoundary>
                    <ModalGeneral 
                        show={this.state.showModal}
                        title={this.state.modalTitle}
                        info={this.state.modalInfo}
                        onClosing={this.onModalInfoClose} />
                    </ErrorBoundary>
                </div>
                </HomeStyle>
            )
        } else {
            home = (
                <div className="login-container"></div>
            )
        }
        // Return the page
        return (
            <div>
                {home}
            </div>
        )
    }
}
