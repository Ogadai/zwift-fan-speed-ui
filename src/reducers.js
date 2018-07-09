import { combineReducers } from 'redux'

import { RECEIVE_STATUS, RECEIVE_FANSPEED } from './actions';

function status(state = { riding: false, manual: false }, action) {
  switch (action.type) {
    case RECEIVE_STATUS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

const defaultFanSpeed = {
  speed: 0,
  fan: 0
};

function fanSpeed(state = defaultFanSpeed, action) {
  switch (action.type) {
    case RECEIVE_FANSPEED:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  status,
	fanSpeed
})

export default rootReducer
