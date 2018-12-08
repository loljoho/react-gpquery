import React, { Component } from 'react';
//import LineChart from 'britecharts/dist/umd/line.min';
//import 'd3-selection';

const requestData = () => {
  let url = 'https://ergast.com/api/f1/current/drivers/alonso/results.json?limit=500';
  return fetch(url)
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {

      console.log(data);

      const rows = data.MRData.RaceTable.Races.map(race => {
        let row = {};

        row.name        = race.round;
        row.value       = race.Results[0].points;

        return row;

      }); // end map
      const res = {};
      res.rows = rows;
      console.log(res);
      return res;
    }); // end then

};

class DriverChartContainer extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData(state, instance) {
    this.setState({ loading: true });
    requestData().then(res => {
      this.setState({
        data: res.rows,
        loading: false
      });
    });
  }
  render() {
    const { data, loading } = this.state;
    return <div></div>
  }
}

export default DriverChartContainer;
