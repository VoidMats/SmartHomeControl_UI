
import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary.js';
import ModalAddSensor from '../components/ModalAddSensor.js';
import ModalDeleteSensor from '../components/ModalDeleteSensor.js'
//import API from '../classes/API.js';

// TODO add sensor style
const SensorStyle = styled.div`
    
`;

export default class Sensor extends Component {
   
    constructor(props) {
        super(props)

        //this.api = new API();
        this.mounted = false;
        this.showAdd = false;

        this.state = {
            loggedIn: 0,
            showAddSensor: false,
            showDeleteSensor: false
        }

        this.handleButtonShowAdd = this.handleButtonShowAdd.bind(this);
        this.handleButtonShowDelete = this.handleButtonShowDelete.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        const lsLoggedIn = localStorage.getItem('loggedIn');
        if (lsLoggedIn === 1) {
            console.log("We are already logged in at SENSOR")
            this.setState({
                loggedIn: 1
            })
        }       
    }

    componentWillUnmount() {
        this.mounted = false;
        //this.api.abort();
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            if (this.props.stateLogin !== prevProps.stateLogin) {
                console.log("We are going to update Sensor page")
                this.setState({
                    loggedIn: this.props.stateLogin
                })
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
        console.log("Trigger closing Modal add sensor")
        this.setState({
            showAddSensor: value
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
        let sensor;
        if (isLoggedIn === 1) {
            sensor = (
                <SensorStyle>
                <div className="sensor-container">
                    <h3 className="sensor-title-sensors">All active DS18BS20 sensors</h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button name="showAddSensor" 
                            variant="secondary" 
                            onClick={() => this.handleButtonShowAdd()}>Add</Button>
                    <Button name="showDeleteSensor"
                            variant="secondary"
                            onClick={() => this.handleButtonShowDelete()}>Delete</Button>
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