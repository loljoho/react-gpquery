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
          //console.log('Success!', response);
          return response.MRData;
        })
        .then((data) => {
          const races = data.RaceTable.Races.map((race) => {

            let response = {};

            // TODO: refactor more efficiently
            race.Results.forEach((result) => {
              if (result.position === '1') {
                response.winner = result;
              }
              if (result.grid === '1') {
                response.pole = result;
              }
              //if (result.position === '2') {
              //  response.second = result.Driver.code;
              //}
              //if (result.position === '3') {
              //  response.third  = result.Driver.code;
              //}
              if (typeof result.FastestLap !== 'undefined') {
                if (result.FastestLap.rank === '1') {
                  response.fastest = result;
                }
              }
            }); // end forEach

            response.season   = race.season;
            response.round    = race.round;
            response.race     = race.raceName;
            response.circuit  = race.Circuit.circuitName;
            response.city     = race.Circuit.Location.locality;
            response.country  = race.Circuit.Location.country;
            response.date     = race.date;
            response.time     = race.time;
            response.results  = race.Results;

            //console.log(JSON.stringify(response, null, '  '));

            return response;
          }); // end map
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
