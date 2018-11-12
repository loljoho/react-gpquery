import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const requestData = () => {
  return fetch('https://ergast.com/api/f1/current/qualifying.json?limit=500')
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {
      //console.log(data);
      const rows = data.MRData.RaceTable.Races.map(race => {
        let row = {};

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

        row.children = race.QualifyingResults;

        return row;
      }); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

class QualifyingTableContainer extends Component {
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
          maxWidth  : 48,
          accessor  : d => parseInt(d.round, 10)
        },
        {
          Header    : 'Race',
          accessor  : 'race'
        },
        //{
        //  Header    : 'Time',
        //  maxWidth  : 120,
        //  accessor  : 'time'
        //}
        {
          Header    : 'Circuit',
          accessor  : 'circuit'
        },
        {
          Header    : 'Location',
          id        : 'country',
          accessor  : d => `${d.city}, ${d.country}`
        },
        //{
        //  Header    : 'Coordinates',
        //  id        : 'lat',
        //  accessor  : d => `${d.lat}, ${d.long}`
        //}
        {
          Header    : 'Date',
          maxWidth  : 120,
          accessor  : 'date'
        },
      ]}
      loading={loading}
      onFetchData={this.fetchData}
      //filterable
      defaultPageSize={25}
      className="-highlight"
      SubComponent={row => {
        return (
          <ReactTable
            data={row.original.children}
            columns={[
              {
                Header    : 'Pos',
                accessor  : 'position',
                maxWidth  : 36,
              },
              {
                Header: 'Driver',
                columns: [
                  {
                    Header    : 'Driver',
                    id        : 'Driver.driverId',
                    accessor  : d => `${d.Driver.givenName} ${d.Driver.familyName}`
                  },
                  {
                    Header    : 'Nationality',
                    accessor  : 'Driver.nationality'
                  },
                ]
              },
              {
                Header: 'Constructor',
                columns: [
                  {
                    Header    : 'Name',
                    accessor  : 'Constructor.name'
                  },
                  {
                    Header    : 'Nationality',
                    accessor  : 'Constructor.nationality'
                  },
                ]
              },
              {
                Header: 'Qualifying Times',
                columns: [
                  {
                    Header    : 'Q1',
                    accessor  : 'Q1'
                  },
                  {
                    Header    : 'Q2',
                    accessor  : 'Q2'
                  },
                  {
                    Header    : 'Q3',
                    accessor  : 'Q3'
                  }
                ]
              }
            ]}
          />
        );
      }}
    />
  }
}

export default QualifyingTableContainer;
