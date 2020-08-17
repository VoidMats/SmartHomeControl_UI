
import React, { Component } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import { CreateTable } from '../components/Table.js'
//import API from '../classes/API.js';

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

        //this.api = new API()
        this.mounted = false;
        this.dataSensors = [
            [1, 'Sensor1', 'Hall', 23.7, 'C'],
            [2, 'Sensor2', 'Dinner', 33.7, 'F'],
            [3, 'Sensor3', 'Bedroom', 21.7, 'C'],
        ];
        this.dataRelays = [
            [1, 'Relay1', 'Hall', 'ON'],
            [2, 'Relay2', 'Dinner', 'OFF'],
            [3, 'Relay3', 'Bedroom', 'ON'],
            [3, 'Relay4', 'Bedroom', 'ON']
        ];

        this.state = {
            loggedIn: 0
        }

    }

    componentDidMount() {
        this.mounted = true;

        const lsLoggedIn = localStorage.getItem('loggedIn');
        if (lsLoggedIn === '1') {
            console.log("We are already logged in at HOME")
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
                            <CreateTable lst={this.dataSensors} />
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
                            <CreateTable lst={this.dataRelays} />
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