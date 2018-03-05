import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PrinterForm } from './PrinterForm'

export class FormModal extends Component {
    handleClose() {
        this.props.onClose();
    }
    handleSubmit(data) {
        this.props.onSubmit(data);
    }
    handleRemove() {
        this.props.onRemove(this.props.data);
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Printer {this.props.data.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrinterForm data={this.props.data} onSubmit={(data) => this.handleSubmit(data)} onRemove={() => this.handleRemove()}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}