import React, { Component } from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';

export class PrinterForm extends Component {
    availablePermissions = ['admin', 'group', 'all']
    _onSubmit(submittedValues) {
        this.props.onSubmit(submittedValues)
    }
    _onRemove() {
        this.props.onRemove()
    }
    render() {
        const validateName = value => !value || value.trim() === '' ? 'Name is a required field' : null
        const validateIpAddress = value => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) ? null : 'Invalid IP address'

        return (
            < Form onSubmit={submittedValues => this._onSubmit(submittedValues)} defaultValues={this.props.data}>
                {
                    formApi => (
                        <form onSubmit={formApi.submitForm} id="form1">
                            <div className={'form-group ' + (formApi.errors && formApi.touched.name && formApi.errors.name ? 'has-error' : '')}>
                                <label htmlFor="name" className="control-label">Name</label>
                                <Text field="name" id="name" className="form-control" validate={validateName} />
                                <span className="help-block">
                                    {formApi.errors && formApi.touched.name && formApi.errors.name ? formApi.errors.name : ''}
                                </span>
                            </div>
                            <div className={'form-group ' + (formApi.errors && formApi.touched.ipAddress && formApi.errors.ipAddress ? 'has-error' : '')}>
                                <label htmlFor="ipAddress" className="control-label">IP address</label>
                                <Text field="ipAddress" id="ipAddress" className="form-control" validate={validateIpAddress} />
                                <span className="help-block">
                                    {formApi.errors && formApi.touched.ipAddress && formApi.errors.ipAddress ? formApi.errors.ipAddress : ''}
                                </span>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="status" className="control-label">Status</label>
                                <Text field="status" id="status" className="form-control" disabled />
                            </div>
                            <label htmlFor="permissions" className="control-label">Permissions</label>
                            <RadioGroup field="permissions">
                                {this.availablePermissions.map((permission, index) => (
                                    <span key={index}>
                                        <Radio value={permission} id={permission} />
                                        <label htmlFor={permission} className="mr-2">{permission[0].toUpperCase() + permission.slice(1)}</label>
                                    </span>
                                ))
                                }
                            </RadioGroup>
                            <div className={'form-group'}>
                                <label htmlFor="description" className="control-label">Description</label>
                                <TextArea field="description" id="description" className="form-control" />
                            </div>
                            <div className={'form-check'}>
                                <Checkbox field="color" id="color" className="form-check-input" />
                                <label htmlFor="color" className="form-check-label">Color</label>
                            </div>
                            {
                                this.props.data.status ? (
                                    <button type="button" onClick={() => this._onRemove()} className="btn btn-danger">
                                        Remove
                                    </button>
                                ) : (
                                        ''
                                    )
                            }
                            <button disabled={formApi.errors} type="submit" className="pull-right btn btn-primary">
                                Submit
                            </button>
                            <div className={'clearfix'}></div>
                        </form>
                    )
                }
            </Form>
        )
    }

}