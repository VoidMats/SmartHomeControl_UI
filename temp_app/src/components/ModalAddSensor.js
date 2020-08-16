
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import API from '../classes/API.js'

// TODO add correct style
const ModalStyles = styled.div`
    
`;

export default class ModalAddSensor extends Component{

    constructor(props) {
        super(props);

        this.api = new API();

        this.state = {
            showHide: false,
            name: '',
            folder: '',
            position: '',
            unit: '',
            comment: ''
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleButtonSave = this.handleButtonSave.bind(this)
        this.handleButtonCancel = this.handleButtonCancel.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            if (this.props.show !== prevProps.show) {
                console.log("Debug msg componentDidUpdate")
                console.log(this.props)
                console.log(this.state)
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
            case 'sensorName':
                value = target.value;
                break;
            case 'sensorFolder':
                value = target.value;
                break;
            case 'sensorPosition':
                value = target.value;
                break;
            case 'sensorUnit':
                const patt = /^[c|C|f|F]/
                if (patt.test(target.value)) {
                    value = target.value.charAt(0);
                } else {
                    value = ''
                }
                break;
            case 'sensorComment':
                value = target.value;
                break;
            default:
                console.error("Error - handleChange got default value")
        }
        this.setState({
            [name]: value
        })
    }

    handleButtonSave(event) {
        // TODO Do API call

        // We used values and they will be cleared
        this.setState({
            sensorName: '',
            sensorFolder: '',
            sensorPosition: '',
            sensorUnit: '',
            sensorComment: ''
        })
        // Close modal
        this.props.onClosing(false);
        //event.preventDefault();
    }

    handleButtonCancel(event) {
        // Abort API call
        this.api.abort()
        // Clear input values
        this.setState({
            name: '',
            folder: '',
            position: '',
            unit: '',
            comment: ''
        })
        // Close modal
        this.props.onClosing(false);
        //event.preventDefault();
    }
    
    render() {
        console.log(this.state.showHide)
        return(
            <ModalStyles>
            <Modal
                show={this.state.showHide} 
                centered={true}>

                <Modal.Header closeButton>
                    <Modal.Title>Add DS18B20 to RASPnode</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <label>
                            DS18BS20 Sensor name:
                            <input type="text"
                                name="sensorName"
                                placeholder="Enter sensor name"
                                value={this.state.sensorName}
                                onChange={this.handleChange} />
                        </label>
                        <label>
                            DS18B20 Sensor folder:
                            <input type="text"
                                name="sensorFolder"
                                placeholder="Enter sensor folder"
                                value={this.state.sensorFolder}
                                onChange={this.handleChange} />
                        </label>
                        <label>
                            DS18B20 Sensor position:
                            <input type="text"
                                name="sensorPosition"
                                placeholder="Enter sensor position"
                                value={this.state.sensorPosition}
                                onChange={this.handleChange} />
                        </label>
                        <label>
                            DS18B20 Sensor unit:
                            <input type="text"
                                name="sensorUnit"
                                placeholder="Enter f/F or c/C"
                                value={this.state.sensorUnit}
                                onChange={this.handleChange} />
                        </label>
                        <label>
                            DS18B20 Sensor comment:
                            <input type="text"
                                name="sensorComment"
                                placeholder="Extra text could be entered here"
                                value={this.state.sensorComment}
                                onChange={this.handleChange} />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button name="cancelSensor" 
                        variant="secondary" 
                        onClick={() => this.handleButtonCancel()}>Close</Button>
                    <Button name="saveSensor" 
                        variant="primary" 
                        onClick={() => this.handleButtonSave()}>Save</Button>
                </Modal.Footer>
            </Modal>
            </ModalStyles>
        )
    }
}