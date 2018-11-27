import React, { Component } from 'react';
import DriverStatCard from './DriverStatCard';
import DriverDetailHeader from './DriverDetailHeader';
import {
  Row,
} from 'reactstrap';
import { FlagByDemonym } from '../../utils/countries';

import moment from 'moment';

const requestData = (driverId) => {
  let url = 'https://ergast.com/api/f1/drivers/' + driverId + '/results.json?limit=500';
  return fetch(url)
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {

      const rows = data.MRData.RaceTable.Races.map(race => {
        let row = {};

        row.season  = race.season;
        row.round   = race.round;
        row.race    = race.raceName;
        row.date    = race.date;
        row.circuit = race.Circuit.circuitName;
        row.city    = race.Circuit.Location.locality;
        row.country = race.Circuit.Location.country;
        row.lat     = race.Circuit.Location.lat;
        row.long    = race.Circuit.Location.long;

        row.number        = race.Results[0].number;
        row.position      = race.Results[0].position;
        row.positionText  = race.Results[0].positionText;
        row.points        = race.Results[0].points;
        row.grid          = race.Results[0].grid;
        row.laps          = race.Results[0].laps;
        row.status        = race.Results[0].status;

        row.driverId          = race.Results[0].Driver.driverId;
        row.driverNumber      = race.Results[0].Driver.permanentNumber;
        row.driverCode        = race.Results[0].Driver.code;
        row.givenName         = race.Results[0].Driver.givenName;
        row.familyName        = race.Results[0].Driver.familyName;
        row.dateOfBirth       = race.Results[0].Driver.dateOfBirth;
        row.driverNationality = race.Results[0].Driver.nationality;

        row.teamId          = race.Results[0].Constructor.constructorId;
        row.teamName        = race.Results[0].Constructor.name;
        row.teamNationality = race.Results[0].Constructor.nationality;

        return row;
      }); // end map

      const res = {};
      res.rows = rows;
      res.driver = {};

      res.driver.driverId           = rows[0].driverId;
      res.driver.driverCode         = rows[0].driverCode;
      res.driver.givenName          = rows[0].givenName;
      res.driver.familyName         = rows[0].familyName;
      res.driver.dateOfBirth        = rows[0].dateOfBirth;
      res.driver.driverNationality  = rows[0].driverNationality;
      res.driver.flag               = FlagByDemonym(rows[0].driverNationality).iso2;

      res.driver.age = moment().diff(moment(res.driver.dateOfBirth), 'years');

      res.driver.races    = 0;
      res.driver.dns      = 0;
      res.driver.poles    = 0;
      res.driver.wins     = 0;
      res.driver.points   = 0;
      res.driver.laps     = 0;
      res.driver.dnf      = 0;
      res.driver.podiums  = 0;
      res.driver.starts   = 0;

      res.driver.avgRacePos     = 0;
      res.driver.avgRaceGrid    = 0;
      res.driver.avgRacePoints  = 0;

      rows.forEach((row) => {

        // races
        res.driver.races++;

        // dns
        if (row.status === 'Withdrew')
          res.driver.dns++;

        // wins
        if (parseInt(row.position, 10) === 1)
          res.driver.wins++;

        // podiums
        if (parseInt(row.position, 10) >= 1 && parseInt(row.position, 10) <= 3)
          res.driver.podiums++;

        // poles
        if (parseInt(row.grid, 10) === 1)
          res.driver.poles++;

        // dnfs
        if (row.status !== 'Finished' && row.status.indexOf('Lap') === -1)
          res.driver.dnf++;

        // points
        res.driver.points += parseInt(row.points, 10);

        // laps
        res.driver.laps   += parseInt(row.laps, 10);

        // avg calculations
        res.driver.avgRacePos += parseInt(row.position, 10);
        res.driver.avgRaceGrid += parseInt(row.grid, 10);

      });

      // starts
      res.driver.starts = res.driver.races - res.driver.dns;

      // avg pos
      res.driver.avgRacePos = (res.driver.avgRacePos / res.driver.starts).toFixed(2);

      // avg grid
      res.driver.avgRaceGrid = (res.driver.avgRaceGrid / res.driver.starts).toFixed(2);

      // avg points
      res.driver.avgRacePoints = (res.driver.points / res.driver.starts).toFixed(2);

      return res;
    }); // end then
}

class DriverDetailContainer extends Component {
  constructor() {
    super()
    this.state = {
      rows: [],
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
    requestData(driverId).then(res => {
      this.setState({
        rows: res.rows,
        driver: res.driver,
        loading: false
      });
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <DriverDetailHeader
          driverId={this.state.driver.driverId}
          givenName={this.state.driver.givenName}
          familyName={this.state.driver.familyName}
          dateOfBirth={this.state.driver.dateOfBirth}
          flag={this.state.driver.flag}
          nationality={this.state.driver.driverNationality}
        />
        <Row>
          <DriverStatCard
            value={this.state.driver.age}
            name="Years Old"
            icon="birthday-cake"
          />
          <DriverStatCard
            value={this.state.driver.races}
            name="Races"
            icon="tachometer-alt"
          />
          <DriverStatCard
            value={this.state.driver.poles}
            name="Pole Positions"
            icon="flag"
          />
          <DriverStatCard
            value={this.state.driver.wins}
            name="Wins"
            icon="trophy"
          />
          <DriverStatCard
            value={this.state.driver.dnf}
            name="DNFs"
            icon="car-crash"
          />
          <DriverStatCard
            value={this.state.driver.dns}
            name="DNSs"
            icon="traffic-light"
          />
          <DriverStatCard
            value={this.state.driver.points}
            name="Points"
            icon="road"
          />
          <DriverStatCard
            value={this.state.driver.podiums}
            name="Podiums"
            icon="flag-checkered"
          />
          <DriverStatCard
            value={this.state.driver.laps}
            name="Total Laps"
            icon="stopwatch"
          />
          <DriverStatCard
            value={this.state.driver.starts}
            name="Total Starts"
            icon="car"
          />
          <DriverStatCard
            value={this.state.driver.avgRacePos}
            name="Avg Pos/Race"
            icon="flag-checkered"
          />
          <DriverStatCard
            value={this.state.driver.avgRaceGrid}
            name="Avg Grid/Race"
            icon="flag"
          />
          <DriverStatCard
            value={this.state.driver.avgRacePoints}
            name="Avg Points/Race"
            icon="road"
          />
        </Row>
      </div>
    );
  }
}

export default DriverDetailContainer;
