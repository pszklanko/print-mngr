import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { FormModal } from './FormModal'
import { Button, Glyphicon } from 'react-bootstrap';
import './App.css';

const data = require('./printers.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      activePrinter: {},
      data: data,
    }
  }
  updatePrinterList(newData) {
    let tmpArray = [...this.state.data];
    let elementIndex = this.state.data.findIndex(element => element.ipAddress === newData.ipAddress);
    if (elementIndex >= 0) {
      tmpArray[elementIndex] = newData;
    } else {
      newData.status = 'idle'
      tmpArray.push(newData);
    }
    this.setState({ data: tmpArray })
  }
  addPrinter() {
    // this.setState(prevState => ({data: [...prevState.data, newData]}))    
    this.setState({ show: true })
  }
  handlePrinterRemove(data) {
    let tmpArray = [...this.state.data];
    let elementIndex = this.state.data.findIndex(element => element.id === data.id);
    tmpArray = [
      ...tmpArray.slice(0, elementIndex),
      ...tmpArray.slice(elementIndex + 1)
    ]
    this.setState({ data: tmpArray })
    this.handleModalClose();
  }
  handleModalClose() {
    this.setState({ show: false, activePrinter: {} })
  }
  handleModalSubmit(newData) {
    this.updatePrinterList(newData)
    this.handleModalClose();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Print Manager</h1>
          <Button bsSize="large" onClick={() => this.addPrinter()}>
            <Glyphicon glyph="plus" />
          </Button>
        </header>
        <ReactTable
          data={this.state.data}
          filterable
          getTrProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e) => {
                this.setState({ show: true, activePrinter: rowInfo.original })
              }
            }
          }}
          defaultFilterMethod={(filter, row) => String(row[filter.id]).includes(filter.value)}
          columns={[
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Status",
              accessor: "status"
            },
            {
              Header: "IP address",
              accessor: "ipAddress"
            },
            {
              Header: "Permissions",
              accessor: "permissions"
            },

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <FormModal
          show={this.state.show}
          data={this.state.activePrinter}
          onSubmit={data => this.handleModalSubmit(data)}
          onRemove={data => this.handlePrinterRemove(data)}
          onClose={() => this.handleModalClose()} />
      </div>
    );
  }
}

export default App;
