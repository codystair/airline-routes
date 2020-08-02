import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table.js'

class App extends Component {
  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table 
            className="routes-table"
            columns={columns}
            rows={DATA.routes}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;