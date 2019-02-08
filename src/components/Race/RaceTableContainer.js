import React, { Component } from 'react';
import { getRaces } from '../../utils/races';
import { FlagByCountry, FlagByDemonym } from '../../utils/countries';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { withRouter } from 'react-router';

import moment from 'moment';

class RaceTableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
  }
  componentDidMount() {
    let year = 'current';
    if (this.props.match) {
      year = this.props.match.params.year || 'current';
    }
    this.setState({ loading: true }, () => {
      getRaces(year).then(res => this.setState({data: res.rows, loading: false}));
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
                    id        : 'Constructor.constructorId',
                    accessor  : d => `${d.Constructor.name}`
                  },
                  {
                    Header    : '',
                    accessor  : 'Constructor.nationality',
                    maxWidth  : 50,
                    Cell: row =>
                      <span className={`flag-icon flag-icon-${FlagByDemonym(row.value).iso2}`}></span>
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

export default withRouter(RaceTableContainer);
