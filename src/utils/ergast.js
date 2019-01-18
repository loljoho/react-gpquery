import _ from 'lodash';

const getConstructors = (year = 'current') => {
  let url = 'https://ergast.com/api/f1/' + year + '/constructorStandings.json'
  return fetch(url)
    .then(res => {
      if (res.status !== 200) {
        console.log('Error status code: ' + res.status);
        return;
      }
      return res.json();
    })
    .then(data => {
      const rows = _.get(data, 'MRData.StandingsTable.StandingsLists[0].ConstructorStandings', [])
        .map(({ Constructor: { constructorId: teamId, name: teamName, nationality: teamNationality }, position, positionText, points, wins, ...rest }) => ({
          teamId,
          teamName,
          teamNationality,
          position,
          positionText,
          points,
          wins,
          ...rest
        })); // end map
      return {
        season: _.get(data, 'MRData.StandingsTable.StandingsLists[0].season', ''),
        round: _.get(data, 'MRData.StandingsTable.StandingsLists[0].round', ''),
        rows: rows
      };
    }); // end then
}

const getRaces = (year = 'current') => {
  let url = 'https://ergast.com/api/f1/' + year + '/results.json?limit=500';
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

        race.Results.forEach(result => {
          if (result.grid === '1') {
            row.pole = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (result.position === '1') {
            row.winner = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (result.position === '2') {
            row.second = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (result.position === '3') {
            row.third  = result.Driver.givenName + ' ' + result.Driver.familyName;
          }
          if (typeof result.FastestLap !== 'undefined') {
            if (result.FastestLap.rank === '1') {
              row.fastest = result.Driver.givenName + ' ' + result.Driver.familyName;
            }
          }
        })

        row.season  = race.season;
        row.round   = race.round;
        row.race    = race.raceName;

        row.date    = race.date;
        row.time    = race.time;

        row.circuit = race.Circuit.circuitName;
        row.city    = race.Circuit.Location.locality;
        row.country = race.Circuit.Location.country;
        row.lat     = race.Circuit.Location.lat;
        row.long    = race.Circuit.Location.long;

        row.children = race.Results;

        return row;
      }); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

export {
  getConstructors,
  getRaces,
}
