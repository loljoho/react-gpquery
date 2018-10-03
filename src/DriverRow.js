import React, { Component } from 'react';
import './DriverRow.css';

class DriverRow extends Component {
  render() {
    return (
      <tr className="DriverRow">
        <td className="DriverRow__name">
          <span className="name last">{this.props.lastName}, </span>
          <span className="name first">{this.props.firstName}</span>
        </td>
        <td className="DriverRow__code">{this.props.driverCode}</td>
        <td className="DriverRow__num">{this.props.driverNumber}</td>
        <td className="DriverRow__flag" alt="{this.props.nationality}"></td>
        <td className="DriverRow__dob">{this.props.dob}</td>
      </tr>
    );
  }
}

export default DriverRow;
