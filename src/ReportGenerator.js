import React, { Component } from 'react';

export class ReportGenerator extends Component {
    generateFile() {
        let textFile = null;
        let data = new Blob([JSON.stringify(this.props.data)], { type: 'text/plain' });
        window.URL.revokeObjectURL(textFile);
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }
    render() {
        return (
            <a className={'btn btn-default ' + this.props.className}  href={this.generateFile()} download>Download report</a>
        )
    }
}