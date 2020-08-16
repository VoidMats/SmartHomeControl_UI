
import React, { Component } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
//import API from '../classes/API.js';

// TODO place proper style for homepage
const HomeStyle = styled.div`
    
`;

export default class Home extends Component {

    constructor(props) {
        super(props);

        //this.api = new API()
        this.mounted = false;

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
                    <h3 className="home-title-temp">DS18B20 temperature sensors</h3>
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
                    <h3 className="home-title-relay">ON/OFF Relays</h3>
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