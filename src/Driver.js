import React, { Component } from 'react';
import './Driver.css';

class Driver extends Component {
  render() {
    return (
      <div className="Driver">
        <div className="Driver__name">
          <span className="name last">{this.props.lastName}</span>
          <span className="name first">{this.props.firstName}</span>
        </div>
        <div className="Driver__code">{this.props.driverCode}</div>
        <div className="Driver__num">{this.props.driverNumber}</div>
        <div className="Driver__flag">
          <span className="nationality">{this.props.nationality}</span>
        </div>
        <div className="Driver__dob">{this.props.dob}</div>
      </div>
    );
  }
}

export default Driver;
