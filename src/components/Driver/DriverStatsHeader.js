import React, { Component } from 'react';

class DriverStatsHeader extends Component {
  render() {
    return (
      <div className="mb-4">
        <h1>
          <span className="text-muted">{this.props.givenName} </span>
          <span>{this.props.familyName} </span>
          <span className={`flag-icon flag-icon-${this.props.flag} float-right`}></span>
        </h1>
        <h2>Career Stats</h2>
      </div>
    );
  }
}

export default DriverStatsHeader;
