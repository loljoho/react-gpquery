import React, { Component } from 'react';
import { getDriverTable } from '../../utils/drivers';
import { FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import moment from 'moment';

class DriverTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
  }
  componentDidMount() {
    this.setState({ loading: true }, () => {
      getDriverTable().then(res => this.setState({data: res.rows, loading: false}))
    })
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
          Header    : '',
          accessor  : 'driverNumber',
          maxWidth  : 50,
        },
        {
          Header    : '',
          accessor  : 'driverNationality',
          maxWidth  : 50,
          Cell: row =>
            <span className={`flag-icon flag-icon-${FlagByDemonym(row.value).iso2}`}></span>
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
      showPagination={false}
      className="-highlight"
    />
  }
}

export default DriverTableContainer;
