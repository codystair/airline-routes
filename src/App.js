import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

class App extends Component {
  render() {
    const rowElements = DATA.routes.map((route, i) => {
      return <tr row-id={i}>
               <td>{route.airline}</td>
               <td>{route.src}</td>
               <td>{route.dest}</td>
             </tr>
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table className="routes-table">
            <thead>
              <th>Airline</th>
              <th>Source Airport</th>
              <th>Destination Airport</th>
            </thead>
            <tbody>
              {rowElements}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;