  import React, { Component } from 'react';

class Select extends Component {


  render() {
    return (
      <select onChange = {this.props.onChange}>
        <option value="all">{this.props.allTitle}</option>
        {this.props.options}
      </select>
    );
  }
}

export default Select;
