
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
    let listSensors = []
    if (sensors !== undefined ) {
        listSensors = sensors.map(row => 
        <ListGroup.Item action variant="dark"
            key={row[0]}
            eventKey={row[0]} 
            onClick={props.onClick} >{row[0]}  {row[1]}</ListGroup.Item>
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
                {x: "08/20 13:23", y: 29.062},
                {x: "08/21 14:24", y: 29.062},
                {x: "08/22 08:30", y: 28.875},
                {x: "08/23 14:27", y: 28.125},
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

        if (this.state.sensors !== '' && this.state.from !== '' && this.state.to !== '') {
            console.log("We trigger list")

            
            console.log(event.target.innerText)
            console.log(this.state.from.toUTCString())
            console.log(this.state.to.toUTCString())

            let value = '';
            const patt = /^\d+/;
            if (patt.test(event.target.innerText)) {
                value = patt.exec(event.target.innerText);
            }
            
            this.api.getTemperature(
                value, 
                this.state.from,
                this.state.to
            )
            .then(result => {
                let data = []
                if (result.status) {
                    data = result.data.map(row => {
                        const regexDate = /\d+-(\d+)-(\d+)(\s\d+:\d+)/;
                        const date = row[3];
                        const match = regexDate.exec(date)
                        const strDate = match[2] + '/' + match[1] + match[3] 
                        return {x: strDate, y: row[2]}
                    })    
                }
                return data
            })
            .then(data => {
                this.setState({
                    data: data
                })
            })
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
