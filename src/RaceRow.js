import React, { Component } from 'react';
import './RaceRow.css';

class RaceRow extends Component {
  render() {
    return (
      <tr className="RaceRow">
        <td className="RaceRow__season">{this.props.season}</td>
        <td className="RaceRow__round">{this.props.round}</td>
        <td className="RaceRow__race">{this.props.race}</td>
        <td className="RaceRow__circuit">{this.props.circuit}</td>
        <td className="RaceRow__city">{this.props.city}</td>
        <td className="RaceRow__country">{this.props.country}</td>
        <td className="RaceRow__date">{this.props.date}</td>
      </tr>
    );
  }
}

export default RaceRow;
