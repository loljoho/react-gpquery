import React, { Component } from 'react';
import './DriverRow.css';

class DriverRow extends Component {
  render() {
    return (
      <tr className="DriverRow">
        <td className="Driver__pos">{this.props.positionText}</td>
        <td className="DriverRow__name">
          {this.props.firstName} {this.props.lastName}
          <span className="name first" style={{display: 'none'}}> {this.props.driverNumber}</span>
          <span className="DriverRow__dob" style={{display: 'none'}}>{this.props.dob}</span>
          <span className="DriverRow__code" style={{display: 'none'}}>{this.props.driverCode}</span>
          <span className="flag" style={{display: 'none'}}>{this.props.nationality}"></span>
        </td>
        <td className="DriverRow_team">
          {this.props.team}
          <span style={{display: 'none'}}>{this.props.teamNationality}</span>
        </td>
        <td className="DriverRow__wins">{this.props.wins}</td>
        <td className="DriverRow__points">{this.props.points}</td>
      </tr>
    );
  }
}

export default DriverRow;
