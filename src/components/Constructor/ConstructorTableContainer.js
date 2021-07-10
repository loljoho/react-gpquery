import React, { Component } from 'react';
import { getConstructors } from '../../utils/constructors';
import { FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ConstructorTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      season: '',
      round: '',
      pages: null,
      loading: true
    }
  }
  componentDidMount() {
    this.setState({ loading: true }, () => {
      getConstructors().then(res => this.setState({data: res.rows, season: res.season, round: res.round, loading: false}));
    });
  }
  render() {
    const { data, season, round, loading } = this.state;
    return (
        //<div className="mb-4">
          //<h1>{season} Constructor Standings</h1>
          //<h2 className="text-muted">Round {round} </h2>
        //</div>
      <React.Fragment>
        <ReactTable
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
          className="-highlight"
        />
      </React.Fragment>
    );
  }
}

export default ConstructorTableContainer;
