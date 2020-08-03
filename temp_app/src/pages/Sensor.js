
import React, { Component } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary.js';
import ModalAddSensor from '../components/ModalAddSensor.js';
import API from '../classes/API.js';

const GridWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    margin-top: 1em;
    margin-left: 6em;
    margin-right: 6em;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(25px, auto);
`;

export default class Sensor extends Component {
   
    constructor(props) {
        super(props)

        //this.api = new API();
        this.mounted = false;

        this.state = {
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

    disableAddSensor() {
        this.setState({
            showAddSensor: false
        })
    }

    handleChange(event) {

    }

    render() {
        return (
            <Container>
                <h2>Sensor Page</h2>
                <GridWrapper>
                    <div>
                        <ErrorBoundary>
                            <ModalAddSensor 
                                show={this.state.showAddSensor}
                                disable={this.disableAddSensor}/>
                        </ErrorBoundary>
                        <Button >Add sensor</Button>
                    </div>
                    <Button >Delete sensor</Button>
                </GridWrapper>
            </Container>
        )
    }
    
}