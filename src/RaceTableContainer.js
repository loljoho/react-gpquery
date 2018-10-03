import React, { Component } from 'react';
import RaceTable from './RaceTable';

class RaceTableContainer extends Component {
  constructor() {
    super()
    this.state = {
      races: []
    }
  }
  componentDidMount() {
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    fetch('http://ergast.com/api/f1/current/results.json?limit=500')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Error status code: ' + response.status);
          return;
        }
        response.json().then((response) => {
          console.log('Success!', response);
          return response.MRData;
        })
        .then((data) => {
          const races = data.RaceTable.Races.map((race) => {
            return {
              season: race.season,
              round: race.round,
              race: race.raceName,
              circuit: race.Circuit.circuitName,
              city: race.Circuit.Location.locality,
              country: race.Circuit.Location.country,
              date: race.date,
              time: race.time,
              results: race.Results
            };
          });
          this.setState({races: races});
        });
      }).catch((err) => {
        console.log('Error: ' + err);
      });
  }
  render() {
    return <RaceTable races={this.state.races} />
  }
}

export default RaceTableContainer;
