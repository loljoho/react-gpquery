import React, { Component } from 'react';
import DriverRow from './DriverRow';
import './DriverTable.css';

class DriverTable extends Component {
  render() {
    const rows = [];
    this.props.drivers.forEach((driver) => {
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
      <div className="table-responsive-md">
        <table className="RaceTable table table-striped table-hover">
          <thead>
            <tr>
              <th colSpan="4">Driver</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default DriverTable;
