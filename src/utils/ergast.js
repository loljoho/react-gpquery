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
        .map(({ Constructor: { constructorId: teamId, name: teamName, nationality: teamNationality }, position, positionText, points, wins }) => ({
          teamId,
          teamName,
          teamNationality,
          position,
          positionText,
          points,
          wins
        })); // end map
      const res = {};
      res.rows = rows;
      return res;
    }); // end then
}

export {
  getConstructors
}
