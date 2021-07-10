import React, { Component } from 'react';
import { FlagByCountry, FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const requestData = (year) => {
  let url = 'https://ergast.com/api/f1/' + year + '/qualifying.json?limit=500';
  return fetch(url)
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
    let year = 'current';
    if (this.props.match) {
      year = this.props.match.params.year || 'current';
    }
    requestData(year).then(res => {
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
          Header    : '',
          accessor  : 'country',
          maxWidth  : 50,
          Cell: row =>
            //row.value
            <span className={`flag-icon flag-icon-${FlagByCountry(row.value).iso2}`}></span>
        },
        {
          Header    : 'Location',
          accessor  : 'city'
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
                    Header    : '',
                    accessor  : 'Driver.nationality',
                    maxWidth  : 50,
                    Cell: row =>
                      <span className={`flag-icon flag-icon-${FlagByDemonym(row.value).iso2}`}></span>
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
                    Header    : '',
                    accessor  : 'Constructor.nationality',
                    maxWidth  : 50,
                    Cell: row =>
                      <span className={`flag-icon flag-icon-${FlagByDemonym(row.value).iso2}`}></span>
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
