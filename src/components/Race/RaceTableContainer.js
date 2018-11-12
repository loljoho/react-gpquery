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

        row.children = race.Results;

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
      SubComponent={row => {
        console.log(row);
        return (
          <ReactTable
            data={row.original.children}
            columns={[
              {
                Header    : 'Pos',
                id        : 'position',
                accessor  : d => d.positionText,
                maxWidth  : 36,
              },
              {
                Header: 'Driver',
                columns: [
                  {
                    Header    : 'Name',
                    id        : 'Driver.driverId',
                    accessor  : d => `${d.Driver.givenName} ${d.Driver.familyName}`
                  },
                  {
                    Header    : 'Num',
                    accessor  : 'Driver.permanentNumber',
                    maxWidth  : 50
                  },
                  {
                    Header    : 'Nationality',
                    accessor  : 'Driver.nationality',
                  },
                ]
              },
              {
                Header: 'Constructor',
                columns: [
                  {
                    Header    : 'Name',
                    id        : 'Constructor.constructorId',
                    accessor  : d => `${d.Constructor.name}`
                  },
                  {
                    Header    : 'Nationality',
                    accessor  : 'Constructor.nationality',
                  }
                ]
              },
              {
                'Header': 'Results',
                columns: [
                  {
                    Header    : 'Laps',
                    accessor  : 'laps',
                    maxWidth  : 50,
                  },
                  {
                    Header    : 'Time/Retired',
                    accessor  : 'Time.time',
                    maxWidth  : 120,
                  },
                  {
                    Header    : 'Grid',
                    accessor  : 'grid',
                    maxWidth  : 50,
                  },
                  {
                    Header    : 'Points',
                    accessor  : 'points',
                    maxWidth  : 50,
                  },
                ]
              },
              {
                Header: 'Fastest Lap',
                columns: [
                  {
                    Header    : 'Rank',
                    accessor  : 'FastestLap.rank',
                    maxWidth  : 50
                  },
                  {
                    Header    : 'Lap',
                    accessor  : 'FastestLap.lap',
                    maxWidth  : 50
                  },
                  {
                    Header    : 'Time',
                    accessor  : 'FastestLap.Time.time',
                    maxWidth  : 80
                  },
                  {
                    Header    : 'Avg Speed',
                    id        : 'FastestLap.AverageSpeed.speed',
                    accessor  : d => {
                      if (typeof d.FastestLap !== 'undefined')
                        return `${d.FastestLap.AverageSpeed.speed} kph`;
                      else
                        return '';
                    },
                    maxWidth  : 100
                  },
                ]
              },
            ]}
          />
        );
      }}
    />
  }
}

export default RaceTableContainer;
