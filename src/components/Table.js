import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  prevPage = (event) => {
    event.preventDefault();
    this.setState({currentPage: this.state.currentPage - 1});
  }

  nextPage = (event) => {
    event.preventDefault();
    this.setState({currentPage: this.state.currentPage + 1});
  }

  render() {
    const start = this.state.currentPage * 25;

    const headers = this.props.columns.map((column, i) => {
      return <th key={i}>{column.name}</th>
    });

    const bodyRows = this.props.rows.slice(start, start + 25).map((row, i) => {
      return <tr key={i}>
               <td>{this.props.format('airline', row.airline)}</td>
               <td>{this.props.format('src', row.src)}</td>
               <td>{this.props.format('dest', row.dest)}</td>
             </tr>
    });

    return (
      <div>
        <table className={this.props.className}>
          <thead>
            {headers}
          </thead>
          <tbody>
            {bodyRows}
          </tbody>
        </table>
        <div className="pagination">
          <p>Showing {start + 1}-{start + 25} of {this.props.rows.length} routes.</p>
          <p>
            <button disabled={start === 0} onClick={this.prevPage}>Previous Page</button>
            <button disabled={(start + 25) === this.props.rows.length} onClick={this.nextPage}>Next Page</button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;
