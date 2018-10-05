import React, { Component } from 'react';
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
      <div className="table-responsive-md">
        <table className="RaceTable table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Constructor</th>
              <th>Wins</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default ConstructorTable;
