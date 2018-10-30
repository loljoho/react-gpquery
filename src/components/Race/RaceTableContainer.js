import React, { Component } from 'react';
import RaceTable from './RaceTable';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class RaceTableContainer extends Component {
  constructor() {
    super()
    this.state = {
      races: []
    }
  }
  fetchData() {
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    fetch('https://ergast.com/api/f1/current/results.json?limit=500')
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
    //return <RaceTable races={this.state.races} />
    return (
      <ReactTable
        columns={[
          {
            Header: 'Rnd'
          },
          {
            Header: 'Race'
          },
          {
            Header: 'Circuit'
          },
          {
            Header: 'Location'
          },
          {
            Header: 'Date'
          }
        ]}
        data={this.races}
        onFetchData={this.fetchData}
      />
    );
  }
}

export default RaceTableContainer;
