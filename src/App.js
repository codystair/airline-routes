import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRoutes: DATA.routes,
    };
  }
  
  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  handleChange = (event) => {
    if (event.target.value === 'all') {
      this.setState({
        filteredRoutes: DATA.routes, 
      });
      return;
    }

    const airlineId = Number(event.target.value);
    this.setState({
      filteredRoutes: DATA.routes.filter(route => {
        return route.airline === airlineId
      }),
    });
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredAirlines = DATA.airlines.map((airline) => {
      return <option key={airline.id} value={airline.id}>{airline.name}</option>
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on 
            <Select 
              options={filteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value=""
              onChange={this.handleChange}
            />
          </p>
          <Table 
            className="routes-table"
            columns={columns}
            rows={this.state.filteredRoutes}
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;
