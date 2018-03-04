import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { FormModal } from './FormModal'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      activePrinter: {},
    }
  }

  handleModalClose() {
    console.log('zamknij')
    this.setState({ show: false })
  }

  handleModalSubmit(data) {
    console.log(data);
    this.handleModalClose();
  }

  render() {
    const data = [
      {
        id: 1,
        name: 'printer01',
        status: 'idle',
        ipAddress: '192.168.43.07',
        description: 'my printer',
        permissions: 'admin',
      },
      {
        id: 2,
        name: 'best printer',
        status: 'broken',
        ipAddress: '192.168.42.01',
        description: 'bla bla bla',
        permissions: 'all',
      },
      {
        id: 3,
        name: 'pink printer',
        status: 'printing',
        ipAddress: '192.168.03.04',
        description: 'wnfeown w ef oenf oeiwnfe',
        permissions: 'group',
      },
      {
        id: 4,
        name: 'ewqpj wwqpoidjiw dqwdw',
        status: 'disconnected',
        ipAddress: '192.168.32.11',
        description: 'qwe wqeqw efwefwefew',
        permissions: 'all',
      }
    ]
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Print Manager</h1>
        </header>
        <ReactTable
          data={data}
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
              Header: "Id",
              accessor: "id"
            },
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
          onClose={() => this.handleModalClose()} />
      </div>
    );
  }
}

export default App;
