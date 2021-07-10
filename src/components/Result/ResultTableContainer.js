import React, { Component } from 'react';
import { FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const requestData = (year, round) => {
  return fetch('https://ergast.com/api/f1/' + year + '/' + round + '/results.json')
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {
      const rows = data.MRData.RaceTable.Races[0].Results.map(result => {
        let row = {};

        row.number        = result.number;
        row.position      = result.position;
        row.positionText  = result.positionText;
        row.points        = result.points;
        row.grid          = result.grid;
        row.laps          = result.laps;

        row.driverId          = result.Driver.driverId;
        row.driverNumber      = result.Driver.permanentNumber;
        row.driverCode        = result.Driver.code;
        row.givenName         = result.Driver.givenName;
        row.familyName        = result.Driver.familyName;
        row.dateOfBirth       = result.Driver.dateOfBirth;
        row.driverNationality = result.Driver.nationality;

        row.teamId          = result.Constructor.constructorId;
        row.teamName        = result.Constructor.name;
        row.teamNationality = result.Constructor.nationality;

        row.status          = result.status;
        if ('Time' in result) {
          row.time = result.Time.time;
        } else {
          row.time = result.status;
        }
        /*
        row.fastestLapRank  = result.FastestLap.rank;
        row.fastestLapNum   = result.FastestLap.lap;
        row.fastestLapTime  = result.FastestLap.Time.time;
        row.fastestLapKph   = result.FastestLap.AverageSpeed.speed;
        */

        return row;
      }); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

class ResultTableContainer extends Component {
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
    let round = 'last';
    if (this.props.match) {
      year = this.props.match.params.year || 'current';
      round = this.props.match.params.round || 'last';
    }
    requestData(year, round).then(res => {
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
          accessor  : d => d.positionText,
          maxWidth  : 36,
        },
        {
          Header: 'Driver',
          columns: [
            {
              Header    : 'Name',
              id        : 'driverId',
              accessor  : d => {
                return {
                  name: `${d.givenName} ${d.familyName}`,
                  id: `${d.driverId}`
                }
              },
              Cell: row =>
                <a href={`drivers/${row.value.id}`}>{row.value.name}</a>
            },
            {
              Header    : 'Num',
              accessor  : 'driverNumber',
              maxWidth  : 50
            },
            {
              Header    : '',
              accessor  : 'driverNationality',
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
              Header  : 'Name',
              id        : 'teamId',
              accessor  : d => `${d.teamName}`
            },
            {
              Header    : '',
              accessor  : 'teamNationality',
              maxWidth  : 50,
              Cell: row =>
                <span className={`flag-icon flag-icon-${FlagByDemonym(row.value).iso2}`}></span>
            },
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
              accessor  : 'time',
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
        /*
        {
          Header: 'Fastest Lap',
          columns: [
            {
              Header    : 'Rank',
              accessor  : 'fastestLapRank',
              maxWidth  : 50
            },
            {
              Header    : 'Lap',
              accessor  : 'fastestLapNum',
              maxWidth  : 50
            },
            {
              Header    : 'Time',
              accessor  : 'fastestLapTime',
              maxWidth  : 80
            },
            {
              Header    : 'Avg Speed',
              id        : 'fastestLapKph',
              accessor  : d => `${d.fastestLapKph} kph`,
              maxWidth  : 100
            },
          ]
        },
        */
      ]}
      loading={loading}
      showPagination={false}
      onFetchData={this.fetchData}
      className="-highlight"
    />
  }
}

export default ResultTableContainer;
