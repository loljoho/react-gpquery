import React, { Component } from 'react';
import './DriverRow.css';

class DriverRow extends Component {
  render() {
    return (
      <tr className="DriverRow">

        <th className="Driver__pos pos" scope="row">{this.props.positionText}</th>

        <td className="DriverRow__driver">
          {this.props.firstName} {this.props.lastName}
          <span className="name first" style={{display: 'none'}}> {this.props.driverNumber}</span>
          <span className="DriverRow__dob" style={{display: 'none'}}>{this.props.dob}</span>
          <span className="DriverRow__code" style={{display: 'none'}}>{this.props.driverCode}</span>
        </td>

        <td className="DriverRow__driver--flag">
          {this.props.nationality}
        </td>

        <td className="DriverRow_constructor">
          {this.props.constructor}
        </td>

        <td className="DriverRow_constructor--flag">
          {this.props.constructorNationality}
        </td>

        <td className="DriverRow__wins">{this.props.wins}</td>

        <td className="DriverRow__points">{this.props.points}</td>

      </tr>
    );
  }
}

export default DriverRow;
