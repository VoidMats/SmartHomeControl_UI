
import React, { Component } from 'react';
import { Table, Button, Container, Collapse } from 'react-bootstrap';
import styled from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary.js';
import ModalAddSensor from '../components/ModalAddSensor.js';
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
            showAddSensor: false
        }
    }

    componentDidMount() {
        this.mounted = true;
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

    disableAddSensor() {
        this.setState({
            showAddSensor: false
        })
    }

    handleChange(event) {

    }

    handleButtonShowAdd(event) {
        this.showAdd = !this.showAdd;
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
                    <h3 className="sensor-title-add">Add DS18BS20 temperature sensor</h3>
                    <Button name="showAddSensor" 
                            variant="secondary" 
                            onClick={this.handleButtonShowAdd}>Close</Button>
                    <Collapse in={this.showAdd}>
                        <ErrorBoundary>
                        <ModalAddSensor 
                            show={this.state.showAddSensor}
                            disable={this.disableAddSensor}/>
                        </ErrorBoundary>
                    </Collapse>
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