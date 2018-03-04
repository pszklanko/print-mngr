import React, { Component } from 'react';
import { Form, Text, Radio, RadioGroup, TextArea } from 'react-form';

export class PrinterForm extends Component {
    handleSubmit(submittedValues) {
        this.props.onSubmit(submittedValues)
    }
    render() {
        return (
            < Form onSubmit={submittedValues => this.handleSubmit(submittedValues)} defaultValues={this.props.data}>
                {
                    formApi => (
                        <form onSubmit={formApi.submitForm} id="form2">
                            <label htmlFor="name">Name</label>
                            <Text field="name" id="name" />
                            <label htmlFor="ipAddress">IP address</label>
                            <Text field="ipAddress" id="ipAddress" />
                            <label htmlFor="status">Status</label>
                            <Text field="status" id="status" disabled/>
                            <RadioGroup field="permissions">
                                <label htmlFor="admin" className="mr-2">Admin</label>
                                <Radio value="admin" id="admin" className="mr-3 d-inline-block" />
                                <label htmlFor="group" className="mr-2">Group</label>
                                <Radio value="group" id="group" className="d-inline-block" />
                                <label htmlFor="all" className="mr-2">All</label>
                                <Radio value="all" id="all" className="d-inline-block" />
                            </RadioGroup>
                            <label htmlFor="description">Description</label>
                            <TextArea field="description" id="description" />
                            <button type="submit" className="mb-4 btn btn-primary">
                                Submit
                </button>
                        </form>
                    )
                }
            </Form>
        )
    }

}