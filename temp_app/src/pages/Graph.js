
import React, { Component } from 'react';
import styled from 'styled-components';
import API from '../classes/API';
import Chart from '../components/Chart.js'
import Calendar from 'react-calendar'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import ErrorBoundary from '../components/ErrorBoundary';

const GraphStyle = styled.div`
    .graph-title {
        text-align: center;
        padding: 16px 0px;
    }
    #graph-chart {
        width: 80%;
        margin: 0 auto;
        padding: 16px 0px;
    }
    .graph-bar {
        width: 80%;
        margin: 0 auto;
    }
`;

const SensorList = (props) => {
    const sensors = props.sensors;
    console.log(sensors)
    let listSensors = []
    if (sensors !== undefined ) {
        listSensors = sensors.map(row => 
        <ListGroup.Item 
            key={row[0].toString()} 
            onClick={props.onClick} >{row[1]}</ListGroup.Item>
    )}
    return (
        <ListGroup >
            {listSensors}
        </ListGroup>
    )
}

export default class Graph extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;
        this.api = new API();

        this.state = {
            loggedIn: 0,
            sensors: [],
            from: new Date(),
            to: new Date(),
            height: 400,
            width: 400,
            data: [
                {x: 0, y: 8},
                {x: 1, y: 5},
                {x: 2, y: 4},
                {x: 3, y: 9},
                {x: 4, y: 1},
                {x: 5, y: 7},
                {x: 6, y: 6},
                {x: 7, y: 3},
                {x: 8, y: 2},
                {x: 9, y: 5}
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.mounted = true;

        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            this.api.addToken(jwt)
        } else {
            this.api.addToken('')
        }

        // Get active sensors
        this.api.getAllSensor()
        .then(result => {
            if (result.status) {
                console.log("We got active sensors in graph")
                return result.data;
            } else {
                return [];
            }
        })
        .then(sensors => {
            const lsLoggedIn = localStorage.getItem('loggedIn');
            console.log("We are logged in at graph")
            if (lsLoggedIn === 1) {
                this.setState({
                    loggedIn: 1,
                    sensors: sensors
                })
            } else {
                //this.props.onLogout(0)
                this.setState({
                    sensors: sensors
                })
            }
        })

    }

    componentWillUnmount() {
        this.mounted = false;
        this.api.abort();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== undefined) {
            if (this.props.stateLogin !== prevProps.stateLogin) {
                this.setState({
                    loggedIn: this.props.stateLogin
                })
            }
        }
    }

    handleChangeDateTo = (to) => {
        console.log(to)
        this.setState({ to })
    }
    
    handleChangeDateFrom = (from) => {
        console.log(from)
        this.setState({ from })
    }

    handleChange(event) {
        console.log(event)
        const target = event.target;
        const name = target.name;
        let value = '';
        switch (name) {
            case 'from':
                value = target.value;
                break;
            case 'to':
                value = target.value;
                break;
            default:
                console.error("Error - handleChange got default value")
        }
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        console.log("We trigger list")

        if (this.state.sensors !== '' && this.state.from !== '' && this.state.to !== '') {
            // TODO API call
        }
    }

    render() {

        const isLoggedIn = this.state.loggedIn;
        const activeSensors = this.state.sensors;
        console.log(activeSensors)
        //console.log(typeof activeSensors)
        
        let graph;
        if (isLoggedIn === 1) {
            graph = (
                <GraphStyle>
                <div className="graph-container">
                    <div id="graph-chart">
                        <Chart data={this.state.data} />
                    </div>
                    <Container className="graph-bar">
                        <Row>
                            <Col>
                                <ErrorBoundary>
                                <Calendar 
                                    onChange={this.handleChangeDateFrom}
                                    value={this.state.from} />
                                </ErrorBoundary>
                            </Col>
                            <Col>
                                <ErrorBoundary>
                                <Calendar 
                                    onChange={this.handleChangeDateTo}
                                    value={this.state.to} />
                                </ErrorBoundary>
                            </Col>
                            <Col>
                                <SensorList sensors={activeSensors} onClick={this.handleSubmit}/>
                            </Col>
                        </Row>
                        
                        
                    </Container>
                </div>
                </GraphStyle>
            )
        } else {
            graph = (
                <div className="graph-container"></div>
            )
        }
        // Return the page
        return (
            <div>
                {graph}
            </div>
        )
    }
}
