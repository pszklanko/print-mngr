import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class FormModal extends Component {
    constructor(props) {
        super(props);
    }
    handleClose() {
        this.props.onClose();
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {JSON.stringify(this.props.data)}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}