import React, { Component } from 'react';
import ConstructorTable from './ConstructorTable';

class ConstructorTableContainer extends Component {
  constructor() {
    super()
    this.state = {
      constructors: [],
      constructorList: [],
      data: []
    }
  }
  componentDidMount() {
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    fetch('https://ergast.com/api/f1/current/constructorStandings.json')
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
          const constructors = data.StandingsTable.StandingsLists[0].ConstructorStandings.map((constructor) => {
            return {
              position: constructor.position,
              positionText: constructor.positionText,
              points: constructor.points,
              wins: constructor.wins,
              constructorId: constructor.Constructor.constructorId,
              constructor: constructor.Constructor.name,
              constructorNationality: constructor.Constructor.nationality,
              url: constructor.Constructor.url
            };
          })
          this.setState({constructors: constructors});
        });
      }).catch((err) => {
        console.log('Error: ' + err);
      });
  }
  render() {
    return <ConstructorTable
              constructors={this.state.constructors}
            />
  }
}

export default ConstructorTableContainer;
