import { combineReducers } from 'redux'

import { RECEIVE_STATUS, RECEIVE_FANSPEED, SLIDING_STATUS } from './actions';

function status(state = { riding: false, manual: false, heartRate: false }, action) {
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

function interaction(state = { sliding: false }, action) {
  switch (action.type) {
    case SLIDING_STATUS:
      return Object.assign({}, state, { sliding: action.sliding });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  status,
  fanSpeed,
  interaction
})

export default rootReducer
