import React, { Component } from 'react';
import DriverRow from './DriverRow';
import './DriverTable.css';

class DriverTable extends Component {
  render() {
    const rows = [];
    this.props.driverList.forEach((driver) => {
      rows.push(<DriverRow
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
      <div className="DriverTable">
        {rows}
      </div>
    );
  }
}

export default DriverTable;
