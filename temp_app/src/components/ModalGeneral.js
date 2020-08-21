
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const ModalStyles = styled.div`

`;

export default class ModalGeneral extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;

        this.state = {
            showHide: false,
            title: '',
            info: ''
        }

        this.handleButtonOkay = this.handleButtonOkay.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props !== undefined) {
            if (this.props.show !== prevProps.show) {
                this.setState({ 
                    showHide: this.props.show,
                    title: this.props.title,
                    info: this.props.info
                })
            }
        }
    }


    handleButtonOkay(event) {

        this.props.onClosing(false);    
        this.setState({
            title: '',
            info: ''
        })
    }

    render() {
        return(
            <ModalStyles>
                <Modal show={this.state.showHide} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.state.info}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button name="modalButtonOkay"
                                variant="secondary"
                                onClick={this.handleButtonOkay}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </ModalStyles>
        )
    }

}