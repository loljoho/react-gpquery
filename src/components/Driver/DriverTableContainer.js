import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import moment from 'moment';

const requestData = () => {
  return fetch('https://ergast.com/api/f1/current/driverStandings.json')
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {
      const rows = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => {
        let row = {};

        row.position        = driver.position;
        row.positionText    = driver.positionText;
        row.points          = driver.points;
        row.wins            = driver.wins;

        row.driverId        = driver.Driver.driverId;
        row.driverNumber    = driver.Driver.permanentNumber;
        row.givenName       = driver.Driver.givenName;
        row.familyName      = driver.Driver.familyName;
        row.code            = driver.Driver.code;
        row.dob             = driver.Driver.dateOfBirth;
        row.nationality     = driver.Driver.nationality;

        row.teamId          = driver.Constructors[0].constructorId;
        row.teamName        = driver.Constructors[0].name;
        row.teamNationality = driver.Constructors[0].nationality;

        return row;
      }); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

class DriverTableContainer extends Component {
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
          Header    : 'Pos',
          id        : 'position',
          accessor  : 'positionText',
          maxWidth  : 50,
        },
        {
          Header    : 'Driver',
          id        : 'driverId',
          accessor  : d => `${d.givenName} ${d.familyName}`
        },
        {
          Header    : '',
          accessor  : 'driverNumber',
          maxWidth  : 50,
        },
        {
          Header    : 'Nationality',
          accessor  : 'nationality',
        },
        {
          Header    : 'DOB',
          id        : 'dob',
          accessor  : d => moment(d.dob).format('MMM DD, YYYY')
        },
        {
          Header    : 'Constructor',
          id        : 'teamId',
          accessor  : 'teamName'
        },
        {
          Header    : 'Nationality',
          accessor  : 'teamNationality',
        },
        {
          Header    : 'Wins',
          accessor  : 'wins',
          maxWidth  : 50,
        },
        {
          Header    : 'Pts',
          accessor  : 'points',
          maxWidth  : 50,
        },
      ]}
      loading={loading}
      showPagination={false}
      onFetchData={this.fetchData}
      className="-highlight"
    />
  }
}

export default DriverTableContainer;
