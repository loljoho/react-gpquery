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
      <table className="RaceTable">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default RaceTable;
