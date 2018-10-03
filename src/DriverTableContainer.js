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
    fetch('http://ergast.com/api/f1/current/drivers.json')
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
          const driverList = data.DriverTable.Drivers.map((driver) => {
            return {
              driverId: driver.driverId,
              driverNumber: driver.permanentNumber,
              firstName: driver.givenName,
              lastName: driver.familyName,
              code: driver.code,
              dob: driver.dateOfBirth,
              nationality: driver.nationality,
              url: driver.url
            };
          })
          this.setState({
            driverList: driverList
          });
        });
      }).catch((err) => {
        console.log('Error: ' + err);
      });
  }
  render() {
    return <DriverTable
              driverList={this.state.driverList}
            />
  }
}

export default DriverTableContainer;
