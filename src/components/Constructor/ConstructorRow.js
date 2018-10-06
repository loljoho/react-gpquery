import React, { Component } from 'react';
import './ConstructorRow.css';

class ConstructorRow extends Component {
  render() {
    return (
      <tr className="ConstructorRow">
        <td className="Constructor__pos">{this.props.positionText}</td>
        <td className="ConstructorRow__name">{this.props.constructor}</td>
        <td className="ConstructorRow__wins">{this.props.wins}</td>
        <td className="ConstructorRow__points">{this.props.points}</td>
      </tr>
    );
  }
}

export default ConstructorRow;
