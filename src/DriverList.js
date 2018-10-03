import React, { Component } from 'react';
import Driver from './Driver';
import './DriverList.css';

class DriverList extends Component {
  render() {
    const rows = [];
    this.props.driverList.forEach((driver) => {
      rows.push(<Driver
                  key={driver.driverId}
                  driverId={driver.driverId}
                  firstName={driver.firstName}
                  lastName={driver.lastName}
                  driverCode={driver.code}
                  driverNumber={driver.driverNumber}
                  dob={driver.dob}
                  nationality={driver.nationality}
                  driverWiki={driver.url}
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
