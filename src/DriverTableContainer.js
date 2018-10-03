import React, { Component } from 'react';
import DriverTable from './DriverTable';

class DriverTableContainer extends Component {
  constructor() {
    super()
    this.state = {
      drivers: [],
      driverList: [],
      data: []
    }
  }
  componentDidMount() {
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    fetch('http://ergast.com/api/f1/current/driverStandings.json')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Error status code: ' + response.status);
          return;
        }
        response.json().then((response) => {
          console.log('Success!', response);
          return response.MRData;
        })
        .then((data) => {
          const drivers = data.StandingsTable.StandingsLists[0].DriverStandings.map((driver) => {
            return {
              position: driver.position,
              positionText: driver.positionText,
              points: driver.points,
              wins: driver.wins,
              driverId: driver.Driver.driverId,
              driverNumber: driver.Driver.permanentNumber,
              firstName: driver.Driver.givenName,
              lastName: driver.Driver.familyName,
              code: driver.Driver.code,
              dob: driver.Driver.dateOfBirth,
              nationality: driver.Driver.nationality,
              url: driver.Driver.url,
              teamId: driver.Constructors[0].constructorId,
              team: driver.Constructors[0].name,
              teamNationality: driver.Constructors[0].nationality
            };
          })
          this.setState({drivers: drivers});
        });
      }).catch((err) => {
        console.log('Error: ' + err);
      });
  }
  render() {
    return <DriverTable
              drivers={this.state.drivers}
            />
  }
}

export default DriverTableContainer;
