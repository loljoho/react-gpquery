import React, { Component } from 'react';
import './ConstructorRow.css';

class ConstructorRow extends Component {
  render() {
    return (
      <tr className="ConstructorRow">

        <th className="Constructor__pos pos" scope="row">{this.props.positionText}</th>

        <td className="ConstructorRow__constructor">{this.props.constructor}</td>
        <td className="ConstructorRow__constructor--flag">{this.props.constructorNationality}</td>

        <td className="ConstructorRow__wins">{this.props.wins}</td>

        <td className="ConstructorRow__points">{this.props.points}</td>

      </tr>
    );
  }
}

export default ConstructorRow;
