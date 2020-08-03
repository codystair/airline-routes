import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAirline: 'all',
    };
  }
  
  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  selectAirline = (id) => {
    if (id === 'all') {
      this.setState({ currentAirline: id });
      return;
    }

    this.setState({ currentAirline: Number(id) });
    // const airlineId = Number(event.target.value);
    // this.setState({
    //   filteredRoutes: DATA.routes.filter(route => {
    //     return route.airline === airlineId
    //   }),
    // });
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredAirlines = DATA.airlines;
    const filteredByAirline = DATA.routes.filter(route => {
      return route.id === this.state.currentAirline}
    );

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on 
            <Select 
              options={DATA.routes}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.currentAirline}
              onSelect={this.selectAirline}
            />
            flying in or out of 
            <button>Show All Routes</button>
          </p>
          <Table 
            className="routes-table"
            columns={columns}
            rows={filteredByAirline}
            format={this.formatValue}
            perPage={25}
            startingPage={0}
          />
        </section>
      </div>
    );
  }
}

export default App;
