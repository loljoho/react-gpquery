import React, { Component } from 'react';
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
                  teamId={driver.teamId}
                  team={driver.team}
                  teamNationality={driver.teamNationality}
                />
      );
    });
    return (
      <div className="table-responsive-md">
        <table className="RaceTable table table-striped table-hover">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Wins</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default DriverTable;
