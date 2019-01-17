import React, { Component } from 'react';
import { FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const requestData = () => {
  return fetch('https://ergast.com/api/f1/current/constructorStandings.json')
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {
      const rows = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(team => {
        let row = {};

        row.position        = team.position;
        row.positionText    = team.positionText;
        row.points          = team.points;
        row.wins            = team.wins;

        row.teamId          = team.Constructor.constructorId;
        row.teamName        = team.Constructor.name;
        row.teamNationality = team.Constructor.nationality;

        return row;
      }); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

class ConstructorTableContainer extends Component {
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
          Header    : 'Constructor',
          id        : 'teamId',
          accessor  : 'teamName'
        },
        {
          Header    : '',
          accessor  : 'teamNationality',
          maxWidth  : 50,
          Cell: row =>
            <span className={`flag-icon flag-icon-${FlagByDemonym(row.value).iso2}`}></span>
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
      minRows={0}
      showPagination={false}
      onFetchData={this.fetchData}
      className="-highlight"
    />
  }
}

export default ConstructorTableContainer;
