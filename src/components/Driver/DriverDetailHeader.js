import React, { Component } from 'react';

class DriverDetailHeader extends Component {
  render() {
    return (
      <div className="mb-4">
        <h1>
          {this.props.givenName}
          <span className="text-muted"> {this.props.familyName} </span>
          <span className={`flag-icon flag-icon-${this.props.flag}`}></span>
        </h1>
        <h2>Career Stats</h2>
      </div>
    );
  }
}

export default DriverDetailHeader;
