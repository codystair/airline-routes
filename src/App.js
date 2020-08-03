import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';
import Map from './components/Map.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: 'all',
      airport: 'all',
    };
  }
  
  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  clearFilters = () => {
    this.setState({
      airline: 'all',
      airport: 'all',
    });
  }

  airlineSelected = (value) => {
    if (value !== 'all') {
      value = Number(value);
    }

    this.setState({airline: value});
  }

  airportSelected = (value) => {
    this.setState({airport: value})
  }

  routeHasCurrentAirline = (route) => {
    return route.airline === this.state.airline || this.state.airline === 'all';
  }

  routeHasCurrentAirport = (route) => {
    return route.src === this.state.airport || route.dest === this.state.airport || this.state.airport === 'all';
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = DATA.routes.filter(route => {
      return this.routeHasCurrentAirline(route) && this.routeHasCurrentAirport(route);
    });

    const filteredRoutesByAirline = DATA.routes.filter(this.routeHasCurrentAirline);
    
    const filteredRoutesByAirport = DATA.routes.filter(this.routeHasCurrentAirport);

    const filteredAirlines = DATA.airlines.filter(airline => {
      return filteredRoutesByAirport.some(route => route.airline === airline.id);
    });

    const filteredAirports = DATA.airports.filter(airport => {
      return filteredRoutesByAirline.some(route => route.src === airport.code || route.dest === airport.code);
    });

    const allShowing = this.state.airline === 'all' && this.state.airport === 'all';

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map routes={filteredRoutes} />

          <p>
            Show routes on 
            <Select 
              options={filteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airline}
              onSelect={this.airlineSelected}
            />
            flying in or out of
            <Select
              options={filteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.airportSelected}
            />
            <button onClick={this.clearFilters} disabled={allShowing}>
              Show All Routes
            </button>
          </p>
          <Table 
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;
