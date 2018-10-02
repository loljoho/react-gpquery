import React, { Component } from 'react';

class Driver extends Component {
  render() {
    const driverId = this.props.driverId;
    return (
      <div className="Driver">
        <span style={{color: '#993333'}}>Firstname </span>
        <span style={{color: '#666699'}}>Lastname</span> {driverId}
      </div>
    );
  }
}

export default Driver;
