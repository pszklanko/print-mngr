import React, { Component } from 'react';
import { Form, Text, Radio, RadioGroup, TextArea } from 'react-form';

export class PrinterForm extends Component {
    handleSubmit(submittedValues) {
        this.props.onSubmit(submittedValues)
    }
    render() {
        const validateName = value => !value || value.trim() === '' ? 'Name is a required field' : null
        const validateIpAddress = value => !value || value.trim() === '' ? 'IP address is a required field' : null
        return (
            < Form onSubmit={submittedValues => this.handleSubmit(submittedValues)} defaultValues={this.props.data}>
                {
                    formApi => (
                        <form onSubmit={formApi.submitForm} id="form2">
                            <div className={formApi.errors && formApi.touched.name && formApi.errors.name ? 'form-group has-error' : 'form-group '}>
                                <label htmlFor="name" className="mb-4 control-label">Name</label>
                                <Text field="name" id="name" className="form-control" validate={validateName} />
                                <span className="help-block">
                                    {formApi.errors && formApi.touched.name && formApi.errors.name ? formApi.errors.name : ''}
                                </span>
                            </div>
                            <div className={formApi.errors && formApi.touched.ipAddress && formApi.errors.ipAddress ? 'form-group has-error' : 'form-group '}>
                                <label htmlFor="ipAddress" className="mb-4 control-label">IP address</label>
                                <Text field="ipAddress" id="ipAddress" className="form-control" validate={validateIpAddress} />
                                <span className="help-block">
                                    {formApi.errors && formApi.touched.ipAddress && formApi.errors.ipAddress ? formApi.errors.ipAddress : ''}
                                </span>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="status" className="mb-4 control-label">Status</label>
                                <Text field="status" id="status" className="form-control" disabled/>
                            </div>
                            <RadioGroup field="permissions">
                                <label htmlFor="admin" className="mr-2">Admin</label>
                                <Radio value="admin" id="admin" className="mr-3 d-inline-block" />
                                <label htmlFor="group" className="mr-2">Group</label>
                                <Radio value="group" id="group" className="d-inline-block" />
                                <label htmlFor="all" className="mr-2">All</label>
                                <Radio value="all" id="all" className="d-inline-block" />
                            </RadioGroup>
                            <div className={'form-group'}>
                                <label htmlFor="description" className="mb-4 control-label">Description</label>
                                <TextArea field="description" id="description" className="form-control"/>
                            </div>
                            <button disabled={formApi.errors} type="submit" className="mb-4 btn btn-primary">
                                Submit
                </button>
                        </form>
                    )
                }
            </Form>
        )
    }

}