import React, { Component } from 'react';
import DriverList from './DriverList';

class DriverListContainer extends Component {
  constructor() {
    super()
    this.state = {
      drivers: [],
      data: [],
      driverTable: []
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
          this.setState({
            data: response.MRData,
            driverTable: response.MRData.DriverTable
          });
          return response.MRData;
        });
      }).catch((err) => {
        console.log('Error: ' + err);
      });
    this.setState({drivers: [2, 4, 6, 8, 1, 3, 5, 7, 9]})
  }
  render() {
    return <DriverList
              drivers={this.state.drivers}
              data={this.state.data}
            />
  }
}

export default DriverListContainer;
