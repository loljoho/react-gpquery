import React, { Component } from 'react';
import './RaceRow.css';

class RaceRow extends Component {
  render() {
    return (
      <tr className="RaceRow">

        <th className="RaceRow__round round" scope="row">{this.props.round}</th>

        <td className="RaceRow__race">{this.props.race}</td>

        <td className="RaceRow__circuit">{this.props.circuit}</td>

        <td className="RaceRow__pole">{this.props.pole.Driver.givenName} {this.props.pole.Driver.familyName}</td>
        <td className="RaceRow__pole--constructor">{this.props.pole.Constructor.name}</td>

        <td className="RaceRow__winner">{this.props.winner.Driver.givenName} {this.props.winner.Driver.familyName}</td>
        <td className="RaceRow__winner--constructor">{this.props.winner.Constructor.name}</td>

        <td className="RaceRow__fastest">{this.props.fastest.Driver.givenName} {this.props.fastest.Driver.familyName}</td>
        <td className="RaceRow__fastest--constructor">{this.props.fastest.Constructor.name}</td>
        <td className="RaceRow__fastest--time">{this.props.fastest.FastestLap.Time.time}</td>

      </tr>
    );
    /*
      <tr className="RaceRow">
        <td className="RaceRow__round">{this.props.round}</td>
        <td className="RaceRow__race">{this.props.race}</td>
        <td className="RaceRow__circuit">{this.props.circuit}</td>
        <td className="RaceRow__city">{this.props.city}, {this.props.country}</td>
        <td className="RaceRow__pole">{this.props.pole.Driver.givenName} {this.props.pole.Driver.familyName}</td>
        <td className="RaceRow__winner">{this.props.winner.Driver.givenName} {this.props.winner.Driver.familyName}</td>
        <td className="RaceRow__fastest">{this.props.fastest.Driver.givenName} {this.props.fastest.Driver.familyName}</td>
        <td className="RaceRow__fastest--time">{this.props.fastest.FastestLap.Time.time}</td>
      </tr>
    */
  }
}

export default RaceRow;
