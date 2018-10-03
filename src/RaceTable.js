import React, { Component } from 'react';
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
                />
      );
    });
    return (
      <div className="table-responsive-md">
        <table className="RaceTable table table-striped table-hover">
          <thead>
            <tr>
              <th>Year</th>
              <th>Rnd</th>
              <th>Race</th>
              <th>Circuit</th>
              <th>Locality</th>
              <th>Country</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default RaceTable;
