import React, { Component } from 'react';
import { getConstructors } from '../../utils/ergast';
import { FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ConstructorTableContainer extends Component {
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
      getConstructors().then(res => this.setState({data: res.rows, loading: false}));
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
