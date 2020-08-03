
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

// TODO add correct style
const Styles = styled.div`
    .navbar { background-color: #8cc3a8; }
    a, .navbar-nav, .navbar-light .nav-link {
        color: #4a7f65;
        &:hover { color: #42554b; }
    }
    .navbar-brand {
        font-size: 1.4em;
        color: #4a7f65;
        &:hover { color: #42554b; }
    }
    .form-center {
        position: absolute !important;
        left: 25%;
        right: 25%;
    }
`;

export default class ModalAddSensor extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            show: false,
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
            if (this.props.show === true) {
                this.setState({ show: true })
            }
        }
    }

    handleChange(event) {
        const target = event.target
        let value = ''
    }

    handleButtonSave(event) {
        this.setState({ show: false })
    }

    handleButtonCancel(event) {
        this.props.disable();
        this.setState({ show: false })
    }
    
    render() {
        return(
            <Modal.Dialog show={this.state.show} handleClose={this.hideModal}>
                <Styles>
                    <Modal.Header closeButton>
                        <Modal.Title>Add DS18B20 to RASPnode</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <label>
                                Name sensor:
                                <input type="text"
                                    name="sensorName"
                                    id="modalSensorName"
                                    value={this.state.name}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                DS18B20 folder:
                                <input type="text"
                                    name="sensorFolder"
                                    id="modalSensorFolder"
                                    value={this.state.folder}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                DS18B20 position:
                                <input type="text"
                                    name="sensorPosition"
                                    id="modalSensorPosition"
                                    value={this.state.position}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                DS18B20 position:
                                <input type="text"
                                    name="sensorPosition"
                                    id="modalSensorPosition"
                                    value={this.state.position}
                                    onChange={this.handleChange} />
                            </label>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button name="saveSensor" 
                            variant="secondary" 
                            onClick={this.handleButtonSave}>Close</Button>
                        <Button name="cancelSensor" 
                            variant="primary" 
                            onClick={this.handleButtonCancel}>Save</Button>
                    </Modal.Footer>
                </Styles>
            </Modal.Dialog>
        )
    }
}