
import React, { Component } from 'react';
import { Table, Button, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary.js';
import ModalAddSensor from '../components/ModalAddSensor.js';
import ModalDeleteSensor from '../components/ModalDeleteSensor.js'
import API from '../classes/API.js';
import { CreateTable } from '../components/Table.js'
//import API from '../classes/API.js';

const SensorStyle = styled.div`
    .sensor-title {
        text-align: center;
        padding: 16px 0px;
    }
    .table {
        width: 90%;
        margin: 0 auto;
    }
    .sensor-buttons {
        padding: 10px 5px;
        margin: 0 auto;
    }
    .sensor-button {
        padding: 5px, 5px;
    }
`;


export default class Sensor extends Component {
   
    constructor(props) {
        super(props)

        //this.api = new API();
        this.mounted = false;
        this.showAdd = false;
        this.api = new API();

        this.state = {
            loggedIn: 0,
            showAddSensor: false,
            showDeleteSensor: false,
            dataSensors: [
                [1, "Sensor1", "Hall", "C"],
                [2, "Sensor2", "Dinner", "F"],
                [3, "Sensor3", "Bedroom", "C"]
            ]
        }

        this.handleButtonShowAdd = this.handleButtonShowAdd.bind(this);
        this.handleButtonShowDelete = this.handleButtonShowDelete.bind(this);
        //this.onCreateTable = this.onCreateTable.bind(this);
        //this.onCreateData = this.onCreateData.bind(this);
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

        // Update table with sensors
        this.api.getAllSensor()
        .then(result => {
            if (result.status) {
                let data = result.data
                data.forEach(element => {
                    element.splice(5,2)
                    element.splice(2,1)
                });
                console.log(data)
                this.setState({
                    dataSensors: data
                })
            }
        })
    }

    componentWillUnmount() {
        this.mounted = false;
        this.api.abort();
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            if (this.props.stateLogin !== prevProps.stateLogin) {
                console.log("We are going to update Sensor page")
                this.setState({
                    loggedIn: this.props.stateLogin
                })
                const jwt = localStorage.getItem("jwt")
                if (jwt) {
                    this.api.addToken(jwt)
                }
            }
            
        }
    }

    changeShowAddSensor(event) {
        this.setState({
            showAddSensor: !this.state.showAddSensor
        })
    }

    changeShowDeleteSensor(event) {
        this.setState({
            showDeleteSensor: !this.state.showDeleteSensor
        })
    }

    handleChange(event) {

    }

    handleButtonShowAdd(event) {
        this.setState({
            showAddSensor: true
        })
    }

    onModalAddClose = (value) => {
        // Update table with new values
        this.api.getAllSensor()
        .then(result => {
            if (result.status) {
                let data = result.data
                data.forEach(element => {
                    element.splice(5,2)
                });
                console.log(data)
                this.setState({
                    dataSensors: data,
                    showAddSensor: value
                })
            }
        })
    }

    handleButtonShowDelete(event) {
        this.setState({
            showDeleteSensor: true
        })
    }

    onModalDeleteClose = (value) => {
        console.log("Trigger closing Modal delete sensor")
        this.setState({
            showDeleteSensor: value
        })
    }

    render() {
        const isLoggedIn = this.state.loggedIn
        // Check if there is any new data
        let sensor;
        if (isLoggedIn === 1) {
            sensor = (
                <SensorStyle>
                <div className="sensor-container">
                    <h3 className="sensor-title">Active DS18BS20 sensors</h3>
                    <Table striped bordered hover size="sm" className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Unit</th>
                        </tr>
                        </thead>
                        <tbody>
                            <CreateTable lst={this.state.dataSensors} />
                        </tbody>
                    </Table>
                    <Container className="sensor-buttons">
                        <Row className="justify-content-md-center">
                            <Button name="showAddSensor" 
                                    variant="outline-secondary"
                                    className="sensor-button" 
                                    onClick={() => this.handleButtonShowAdd()}>Add</Button>
                            <Button name="showDeleteSensor"
                                    variant="outline-secondary"
                                    onClick={() => this.handleButtonShowDelete()}>Delete</Button>
                        </Row>
                    </Container>
                    <ErrorBoundary>
                    <ModalAddSensor 
                        show={this.state.showAddSensor}
                        onClosing={this.onModalAddClose}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                    <ModalDeleteSensor
                        show={this.state.showDeleteSensor}
                        onClosing={this.onModalDeleteClose} />
                    </ErrorBoundary>

                </div>
                </SensorStyle>
            )
        } else {
            sensor = (
                <div className="sensor-container"></div>
            )
        }
        return (   
            <div>
                {sensor}
            </div>
        )
    }
    
}