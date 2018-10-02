import React, { Component } from 'react';
import DriverList from './DriverList';

class DriverListContainer extends Component {
  constructor() {
    super()
    const drivers = [2, 4, 6, 8, 1, 3, 5, 7, 9]
    this.state = { drivers }
  }
  render() {
    return <DriverList drivers={this.state.drivers} />
  }
}

export default DriverListContainer;
