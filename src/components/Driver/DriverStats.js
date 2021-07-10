import React, { Component } from 'react';
import DriverStatCard from './DriverStatCard';
import {
  Row,
} from 'reactstrap';

class DriverStats extends Component {
  render() {
    return (
      <Row>
        <DriverStatCard
          value={this.props.age}
          name="Years Old"
          icon="birthday-cake"
        />
        <DriverStatCard
          value={this.props.seasons}
          name="Seasons"
          icon="calendar"
        />
        <DriverStatCard
          value={this.props.races}
          name="Races"
          icon="tachometer-alt"
        />
        <DriverStatCard
          value={this.props.poles}
          name="Pole Positions"
          icon="flag"
        />
        <DriverStatCard
          value={this.props.wins}
          name="Wins"
          icon="trophy"
        />
        <DriverStatCard
          value={this.props.dnf}
          name="DNFs"
          icon="car-crash"
        />
        <DriverStatCard
          value={this.props.dns}
          name="DNSs"
          icon="traffic-light"
        />
        <DriverStatCard
          value={this.props.points}
          name="Points"
          icon="road"
        />
        <DriverStatCard
          value={this.props.podiums}
          name="Podiums"
          icon="flag-checkered"
        />
        <DriverStatCard
          value={this.props.laps}
          name="Total Laps"
          icon="stopwatch"
        />
        <DriverStatCard
          value={this.props.starts}
          name="Total Starts"
          icon="car"
        />
        <DriverStatCard
          value={this.props.avgRacePos}
          name="Avg Pos/Race"
          icon="flag-checkered"
        />
        <DriverStatCard
          value={this.props.avgRaceGrid}
          name="Avg Grid/Race"
          icon="flag"
        />
        <DriverStatCard
          value={this.props.avgRacePoints}
          name="Avg Points/Race"
          icon="road"
        />
        <DriverStatCard
          value={this.props.avgRaceWins}
          name="Avg Wins/Race"
          icon="flag"
        />
        <DriverStatCard
          value={this.props.avgRacePoles}
          name="Avg Poles/Race"
          icon="trophy"
        />
        <DriverStatCard
          value={this.props.seasonMin}
          name="First Season"
          icon="calendar-minus"
        />
        <DriverStatCard
          value={this.props.seasonMax}
          name="Last Season"
          icon="calendar-plus"
        />
      </Row>
    );
  }
}

export default DriverStats;
