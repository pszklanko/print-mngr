import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { FormModal } from './FormModal'
import { PrinterForm } from './PrinterForm'
import { Glyphicon, Nav, NavItem, Alert, Collapse } from 'react-bootstrap';

const data = require('./printers.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      activePrinter: {},
      data: data,
      activeTab: 'home',
      showAlert: false,
      alertMsg: ''
    }
  }
  updatePrinterList(newData) {
    let tmpArray = [...this.state.data];
    let elementIndex = this.state.data.findIndex(element => element.ipAddress === newData.ipAddress);
    if (elementIndex >= 0) {
      tmpArray[elementIndex] = newData;
      this.handleAlert('Printer edited', 2500)
    } else {
      newData.status = 'idle'
      tmpArray.push(newData);
      this.handleAlert('Printer added', 2500)
    }
    this.setState({ data: tmpArray })
  }
  addPrinter(data) {
    this.updatePrinterList(data);
    this.setState({ activeTab: 'home', activePrinter: {} });
  }
  handlePrinterRemove(data) {
    let tmpArray = [...this.state.data];
    let elementIndex = this.state.data.findIndex(element => element.id === data.id);
    tmpArray = [
      ...tmpArray.slice(0, elementIndex),
      ...tmpArray.slice(elementIndex + 1)
    ]
    this.setState({ data: tmpArray })
    this.handleAlert('Printer removed', 2500)
    this.handleModalClose();
  }
  handleModalClose() {
    this.setState({ show: false, activePrinter: {} })
  }
  handleModalSubmit(newData) {
    this.updatePrinterList(newData)
    this.handleModalClose();
  }
  handleSelect(selectedKey) {
    this.setState({ activeTab: selectedKey })
  }
  handleShowAlert(msg) {
    this.setState({ showAlert: true, alertMsg: msg })
  }
  handleDismissAlert() {
    this.setState({ showAlert: false })
  }
  handleAlert(msg, time) {
    this.handleShowAlert(msg);
    setTimeout(() => this.handleDismissAlert(), time)
  }
  render() {
    return (
      <div className="App">
        <Collapse in={this.state.showAlert}>
          <Alert bsStyle="success">
            { this.state.alertMsg }
        </Alert>
        </Collapse>
        <Nav bsStyle="pills" activeKey={this.state.activeTab} onSelect={(activeKey) => this.handleSelect(activeKey)}>
          <NavItem eventKey={'home'}>
            <Glyphicon glyph="home" /> Home
            </NavItem>
          <NavItem eventKey={'add'}>
            <Glyphicon glyph="plus" /> Add
            </NavItem>
        </Nav>
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
          className={"-striped -highlight " + (this.state.activeTab !== 'home' ? 'hidden' : '')}
        />
        <div className={'form-container ' + (this.state.activeTab !== 'add' ? 'hidden' : '')}>
          <PrinterForm data={this.state.activePrinter} onSubmit={(data) => this.addPrinter(data)} />
        </div>
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
