import React, { Component } from 'react';
import Driver from './Driver';
import './DriverList.css';

class DriverList extends Component {
  render() {
    const rows = [];
    this.props.drivers.forEach((driver) => {
      rows.push(<Driver
                  driverId={driver}
                  key={driver}
                />
      );
    });
    return (
      <div className="DriverList">
        {rows}
      </div>
    );
  }
}

export default DriverList;
