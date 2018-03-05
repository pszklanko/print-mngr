import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PrinterForm } from './PrinterForm'
import { ReportGenerator } from './ReportGenerator'

export class FormModal extends Component {
    _onClose() {
        this.props.onClose();
    }
    _onSubmit(data) {
        this.props.onSubmit(data);
    }
    _onRemove() {
        this.props.onRemove(this.props.data);
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this._onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.data.status ? 'Edit printer' : 'Add printer'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrinterForm data={this.props.data} onSubmit={(data) => this._onSubmit(data)} onRemove={() => this._onRemove()} />
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.data.status ? (
                            <ReportGenerator data={this.props.data} className={'pull-left'} />
                        ) : (
                                ''
                            )
                    }
                    <Button onClick={() => this._onClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}