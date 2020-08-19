
import React, { Component } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import { CreateTable } from '../components/Table.js'
import API from '../classes/API.js';

const HomeStyle = styled.div`
    .home-title {
        text-align: center;
        padding: 16px 0px;
    }
    .table {
        width: 90%;
        margin: 0 auto;
    }
`;

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;
        this.api = new API()
        
        this.state = {
            loggedIn: 0,
            dataSensors: [
                [1, "Sensor1", 'Hall', 23.7, 'C'],
                [2, 'Sensor2', 'Dinner', 33.7, 'F'],
                [3, 'Sensor3', 'Bedroom', 21.7, 'C'],
            ],
            dataRelays: [
                [1, 'Relay1', 'Hall', 'ON'],
                [2, 'Relay2', 'Dinner', 'OFF'],
                [3, 'Relay3', 'Bedroom', 'ON'],
                [3, 'Relay4', 'Bedroom', 'ON']
            ]
        }

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