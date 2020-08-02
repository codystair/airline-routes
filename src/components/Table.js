import React, { Component } from 'react';

class Table extends Component {
  render() {
    const headers = this.props.columns.map((column, i) => {
      return <th key={i}>{column.name}</th>
    });
    const bodyRows = this.props.rows.map((row, i) => {
      return <tr key={i}>
               <td>{this.props.format('airline', row.airline)}</td>
               <td>{this.props.format('src', row.src)}</td>
               <td>{this.props.format('dest', row.dest)}</td>
             </tr>
    });

    return <table className={this.props.className}>
      <thead>
        {headers}
      </thead>
      <tbody>
        {bodyRows}
      </tbody>
    </table>
  }
}

export default Table;
