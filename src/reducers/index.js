import { combineReducers } from 'redux'
import {
  SELECT_SEASON, INVALIDATE_SEASON,
  REQUEST_RACES, RECEIVE_RACES
} from '../actions'

const selectedSeason = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SEASON:
      return action.season
    default:
      return state
  }
}

const races = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SEASON:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_RACES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_RACES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.races,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const racesBySeason = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SEASON:
    case RECEIVE_RACES:
    case REQUEST_RACES:
      return {
        ...state,
        [action.season]: races(state[action.season], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  racesBySeason,
  selectedSeason
})

export default rootReducer
