import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Row,
  Col,
} from 'reactstrap';
import {Bar} from 'react-chartjs-2';

import DriverStatsHeader from './DriverStatsHeader';
import DriverStats from './DriverStats';

import { getDriverStats } from '../../utils/drivers';

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    yAxes: [
      {
        type: 'category',
        display: true,
        position: 'right',
        id: 'y-axis-position',
        gridLines: {
          display: true
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
      },
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-points',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

class DriverStatsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      chart: {
        data: {
          labels: [],
          datasets: []
        }
      },
      driver: {},
      pages: null,
      loading: true
    }
  }
  componentDidMount() {
    let driverId = 'alonso';
    if (this.props.match) {
      driverId = this.props.match.params.driverId || 'alonso';
    }
    getDriverStats(driverId).then(res => {
      this.setState({
        rows: res.rows,
        chart: {
          data: res.data,
          options: options
        },
        driver: res.driver,
        loading: false
      });
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <DriverStatsHeader
          driverId={this.state.driver.driverId}
          givenName={this.state.driver.givenName}
          familyName={this.state.driver.familyName}
          dateOfBirth={this.state.driver.dateOfBirth}
          flag={this.state.driver.flag}
          nationality={this.state.driver.driverNationality}
        />
        <DriverStats
          age={this.state.driver.age}
          seasons={this.state.driver.seasons}
          races={this.state.driver.races}
          poles={this.state.driver.poles}
          wins={this.state.driver.wins}
          dnf={this.state.driver.dnf}
          dns={this.state.driver.dns}
          points={this.state.driver.points}
          podiums={this.state.driver.podiums}
          laps={this.state.driver.laps}
          starts={this.state.driver.starts}
          avgRacePos={this.state.driver.avgRacePos}
          avgRaceGrid={this.state.driver.avgRaceGrid}
          avgRacePoints={this.state.driver.avgRacePoints}
          avgRaceWins={this.state.driver.avgRaceWins}
          avgRacePoles={this.state.driver.avgRacePoles}
          seasonMin={this.state.driver.seasonMin}
          seasonMax={this.state.driver.seasonMax}
        />
        <Row>
          <Col>
            <Bar
              data={this.state.chart.data}
              options={this.state.chart.options}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(DriverStatsContainer);
