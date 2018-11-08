import React, { Component } from 'react';
import './RaceRow.css';

class RaceRow extends Component {
  render() {
    return (
      <tr className="RaceRow">
        <td className="RaceRow__round">{this.props.round}</td>
        <td className="RaceRow__race">{this.props.race}</td>
        <td className="RaceRow__circuit">{this.props.circuit}</td>
        <td className="RaceRow__city">{this.props.city}, {this.props.country}</td>
        <td className="RaceRow__winner">{this.props.winner.Driver.givenName} {this.props.winner.Driver.familyName}</td>
        <td className="RaceRow__fastest">{this.props.fastest.Driver.givenName} {this.props.fastest.Driver.familyName}</td>
      </tr>
    );
  }
}

export default RaceRow;
