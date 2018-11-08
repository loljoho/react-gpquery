import React, { Component } from 'react';
import { Table } from 'reactstrap';

import RaceRow from './RaceRow';

import './RaceTable.css';

class RaceTable extends Component {
  render() {
    const rows = [];
    this.props.races.forEach((race) => {
      rows.push(<RaceRow
                  key={[race.season, '-', race.round].join()}
                  season={race.season}
                  round={race.round}
                  race={race.race}
                  circuit={race.circuit}
                  city={race.city}
                  country={race.country}
                  date={race.date}
                  time={race.time}
                  winner={race.winner}
                  fastest={race.fastest}
                  pole={race.pole}
                />
      );
    });
    return (
      <Table className="RaceTable" hover striped responsive bordered size="sm">
        <thead>
          <tr>
            <th className="round">Rnd</th>
            <th>Race</th>
            <th>Circuit</th>
            <th>Pole Position</th>
            <th colSpan="2">Fastest Lap</th>

            <th colSpan="2">Winner</th>

          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default RaceTable;
