import React, { Component } from 'react';
import './DriverRow.css';

class DriverRow extends Component {
  render() {
    return (
      <div className="DriverRow">
        <div className="DriverRow__name">
          <span className="name last">{this.props.lastName}</span>
          <span className="name first">{this.props.firstName}</span>
        </div>
        <div className="DriverRow__code">{this.props.driverCode}</div>
        <div className="DriverRow__num">{this.props.driverNumber}</div>
        <div className="DriverRow__flag">
          <span className="nationality">{this.props.nationality}</span>
        </div>
        <div className="DriverRow__dob">{this.props.dob}</div>
      </div>
    );
  }
}

export default DriverRow;
