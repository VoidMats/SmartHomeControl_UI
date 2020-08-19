
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import API from '../classes/API.js'

// TODO add correct style
const ModalStyles = styled.div`
    
`;

export default class ModalDeleteSensor extends Component{

    constructor(props) {
        super(props);

        this.mounted = false;
        this.api = new API();

        this.state = {
            showHide: false,
            sensorId: undefined
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleButtonDelete = this.handleButtonDelete.bind(this);
        this.handleButtonCancel = this.handleButtonCancel.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            this.api.addToken(jwt)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            if (this.props.show !== prevProps.show) {
                console.log("Debug msg componentDidUpdate")

                this.setState({ 
                    showHide: this.props.show 
                })
            }
        }
    }

    handleChange(event) {
        const target = event.target
        const name = target.name;
        let value = '';
        switch (name) {
            case 'sensorId':
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

    handleButtonDelete = (event) => {
        
        this.api.deleteSensor(this.state.sensorId)
        .then(result => {
            if (result.status) {
                console.log(result.data)
            } else {
                // TODO if we get code 401 => logout  
            }
        })

        // Close modal
        this.props.onClosing(false);

        // We used values and they will be cleared
        this.setState({
            sensorId: undefined
        })
        //event.preventDefault();
    }

    handleButtonCancel(event) {

        // Abort API call
        this.api.abort()

        // Close modal
        this.props.onClosing(false);

        // Clear input values
        this.setState({
            sensorId: undefined
        })
        //event.preventDefault();
    }
    
    render() {
        return(
            <ModalStyles>
            <Modal
                show={this.state.showHide} 
                centered={true}>

                <Modal.Header closeButton>
                    <Modal.Title>Delete DS18B20 to RASPnode</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <label>
                            DS18BS20 Sensor id:
                            <input type="text"
                                name="sensorId"
                                placeholder="Enter sensor name"
                                value={this.state.sensorId}
                                onChange={this.handleChange} />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button name="cancelSensor" 
                        variant="secondary" 
                        onClick={() => this.handleButtonCancel()}>Close</Button>
                    <Button name="deleteSensor" 
                        variant="primary" 
                        onClick={this.handleButtonDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
            </ModalStyles>
        )
    }
}