import React, { Component } from 'react';
import { Table } from 'reactstrap';

import ConstructorRow from './ConstructorRow';

import './ConstructorTable.css';

class ConstructorTable extends Component {
  render() {
    const rows = [];
    this.props.constructors.forEach((constructor) => {
      rows.push(<ConstructorRow
                  key={constructor.constructorId}
                  position={constructor.position}
                  positionText={constructor.positionText}
                  points={constructor.points}
                  wins={constructor.wins}
                  constructorId={constructor.constructorId}
                  constructor={constructor.constructor}
                  constructorNationality={constructor.constructorNationality}
                  url={constructor.url}
                />
      );
    });
    return (
      <Table className="ConstructorTable" hover striped responsive bordered size="sm">
        <thead>
          <tr>
            <th>Pos</th>
            <th colSpan="2">Constructor</th>
            <th>Wins</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default ConstructorTable;
