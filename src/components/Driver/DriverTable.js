import React, { Component } from 'react';
import { Table } from 'reactstrap';

import DriverRow from './DriverRow';

import './DriverTable.css';

class DriverTable extends Component {
  render() {
    const rows = [];
    this.props.drivers.forEach((driver) => {
      rows.push(<DriverRow
                  position={driver.position}
                  positionText={driver.positionText}
                  points={driver.points}
                  wins={driver.wins}
                  key={driver.driverId}
                  driverId={driver.driverId}
                  firstName={driver.firstName}
                  lastName={driver.lastName}
                  driverCode={driver.code}
                  driverNumber={driver.driverNumber}
                  dob={driver.dob}
                  nationality={driver.nationality}
                  driverWiki={driver.url}
                  constructorId={driver.constructorId}
                  constructor={driver.constructor}
                  constructorNationality={driver.constructorNationality}
                />
      );
    });
    return (
      <Table className="DriverTable" hover striped responsive bordered size="sm">
        <thead>
          <tr>
            <th>Pos</th>
            <th colSpan="2">Driver</th>
            <th colSpan="2">Constructor</th>
            <th>Wins</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default DriverTable;
