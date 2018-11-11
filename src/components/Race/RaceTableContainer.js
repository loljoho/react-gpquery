import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import moment from 'moment';

const requestData = () => {
  return fetch('https://ergast.com/api/f1/current/results.json?limit=500')
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {
      const rows = data.MRData.RaceTable.Races.map(race => {
        let row = {};

        race.Results.forEach(result => {
          if (result.grid === '1') {
            row.pole = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (result.position === '1') {
            row.winner = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (result.position === '2') {
            row.second = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (result.position === '3') {
            row.third  = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (typeof result.FastestLap !== 'undefined') {
            if (result.FastestLap.rank === '1') {
              row.fastest = result.Driver.givenName + ' ' + result.Driver.familyName;
            }
          }
        })

        row.season  = race.season;
        row.round   = race.round;
        row.race    = race.raceName;

        row.date    = race.date;
        row.time    = race.time;

        row.circuit = race.Circuit.circuitName;
        row.city    = race.Circuit.Location.locality;
        row.country = race.Circuit.Location.country;
        row.lat     = race.Circuit.Location.lat;
        row.long    = race.Circuit.Location.long;

        return row;
      }); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

class RaceTableContainer extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData(state, instance) {
    this.setState({ loading: true });
    requestData().then(res => {
      this.setState({
        data: res.rows,
        loading: false
      });
    });
  }
  render() {
    const { data, loading } = this.state;
    return <ReactTable
      data={data}
      columns={[
        {
          Header    : 'Rnd',
          id        : 'round',
          accessor  : d => parseInt(d.round, 10),
          maxWidth  : 36,
        },
        {
          Header    : 'Race',
          accessor  : 'race',
        },
        {
          Header    : 'Circuit',
          accessor  : 'circuit',
        },
        {
          Header    : 'Location',
          id        : 'country',
          accessor  : d => `${d.city}, ${d.country}`,
          maxWidth  : 200,
        },
        // Latitude, Longitude
        //{
        //  Header    : 'Coordinates',
        //  id        : 'lat',
        //  accessor  : d => `${d.lat}, ${d.long}`
        //},
        {
          Header    : 'Date',
          maxWidth  : 100,
          id        : 'date',
          accessor  : d => moment(d.date).format('MMM DD, YYYY')
        },
        {
          Header    : 'Time',
          maxWidth  : 100,
          id        : 'time',
          accessor  : d => moment(d.date+'T'+d.time).format('HH:mm:ss[Z]')
        },
        //{
        //  Header    : 'Time',
        //  maxWidth  : 100,
        //  accessor  : 'time'
        //},
        {
          Header    : 'Pole Position',
          accessor  : 'pole',
          maxWidth  : 120,
        },
        {
          Header    : 'Winner',
          accessor  : 'winner',
          maxWidth  : 120,
        },
        {
          Header    : 'Fastest Lap',
          accessor  : 'fastest',
          maxWidth  : 120,
        }

      ]}
      loading={loading}
      showPagination={false}
      onFetchData={this.fetchData}
      className="-highlight"
    />
  }
}

export default RaceTableContainer;
