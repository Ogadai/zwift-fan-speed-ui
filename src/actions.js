import axios from 'axios';

export const RECEIVE_STATUS = "RECEIVE_STATUS";

const POLLING_INTERVAL = 1000;

function receiveStatus(data) {
  return {
    type: RECEIVE_STATUS,
		data
  };
}

export function fetchStatus() {
  return dispatch => {
    axios.get('/status/').then(response => {
      const { riding, manual, fan } = response.data;
      dispatch(receiveStatus({ riding, manual }));
      dispatch(receiveFanSpeed(fan));
    });
  }
}

export function setManualMode(manual) {
  return dispatch => {
    axios.post('/status/', { manual }).then(response => dispatch(receiveStatus(response.data)));
  }
}

export const RECEIVE_FANSPEED = "RECEIVE_FANSPEED";

function receiveFanSpeed(data) {
  return {
    type: RECEIVE_FANSPEED,
    data
  };
}

export function fetchFanSpeed() {
  return dispatch => {
    axios.get('/fan/').then(response => dispatch(receiveFanSpeed(response.data)));
  }
}

export function setFanSpeed(speed) {
  return dispatch => {
    axios.post('/fan/', { speed }).then(response => dispatch(receiveFanSpeed(response.data)));
  }
}

export function pollServer() {
  return dispatch => {
    dispatch(fetchStatus());
    setInterval(() => dispatch(fetchStatus()), POLLING_INTERVAL);
  }
}
