export const REQUEST_RACES = 'REQUEST_RACES';
export const RECEIVE_RACES = 'RECEIVE_RACES';
export const SELECT_SEASON = 'SELECT_SEASON';
export const INVALIDATE_SEASON = 'INVALIDATE_SEASON';

export const selectSeason = (season = 'current') => ({
  type: SELECT_SEASON,
  season
})

export const invalidateSeason = (season = 'current') => ({
  type: INVALIDATE_SEASON,
  season
})

export const requestRaces = (season = 'current') => ({
  type: REQUEST_RACES,
  season
})

export const receiveRaces = (season = 'current', json) => ({
  type: RECEIVE_RACES,
  season,
  races: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchRaces = (season = 'current') => dispatch => {
  dispatch(requestRaces(season))
  return fetch(`https://ergast.com/api/f1/${season}/results.json?limit=500`)
    .then(response => response.json())
    .then(json => {
      const races = json.MRData.RaceTable.Races.map((race) => {
        return {
          season: race.season,
          round: race.round,
          race: race.raceName,
          circuit: race.Circuit.circuitName,
          city: race.Circuit.Location.locality,
          country: race.Circuit.Location.country,
          date: race.date,
          time: race.time,
          results: race.Results
        };
      });
      dispatch(receiveRaces(season, races));
    });

}

const shouldFetchRaces = (state, season = 'current') => {
  const races = state.racesBySeason[season]
  if (!races) {
    return true;
  }
  if (races.isFetching) {
    return false;
  }
  return races.didInvalidate;
}

export const fetchRacesIfNeeded = (season = 'current') => (dispatch, getState) => {
  if (shouldFetchRaces(getState(), season)) {
    return dispatch(fetchRaces(season));
  }
}
