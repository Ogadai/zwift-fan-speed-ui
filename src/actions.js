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
  return (dispatch, getState) => {
    if (getState().interaction.sliding) return Promise.resolve();

    axios.get('/status/').then(response => {
      if (getState().interaction.sliding) return;
      const { riding, manual, heartRate, fan } = response.data;
      dispatch(receiveStatus({ riding, manual, heartRate }));
      dispatch(receiveFanSpeed(fan));
    });
  }
}

export function setManualMode(manual) {
  return dispatch => {
    axios.post('/status/', { manual }).then(response => dispatch(receiveStatus(response.data)));
  }
}

export function setHearRateMode(heartRate) {
  return dispatch => {
    axios.post('/status/', { heartRate }).then(response => dispatch(receiveStatus(response.data)));
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
  return dispatch => dispatch(callFanSpeed('get'));
}

export function setFanSpeed(speed) {
  return dispatch => {
    dispatch(receiveFanSpeed({
      speed, fan: speed
    }));
    return dispatch(callFanSpeed('post', { speed }));
  }
}

let fanSpeedCancelFn;
function callFanSpeed(verb, params) {
  let cancelled = false;
  if (fanSpeedCancelFn) fanSpeedCancelFn();
  fanSpeedCancelFn = () => { cancelled = true; fanSpeedCancelFn = null; }

  return (dispatch, getState) => {
    axios[verb]('/fan/', params).then(response => {
      if (!cancelled && !getState().interaction.sliding) {
        fanSpeedCancelFn = null;
        dispatch(receiveFanSpeed(response.data))
      }
    });
  }
}

export function pollServer() {
  return dispatch => {
    dispatch(fetchStatus());
    setInterval(() => dispatch(fetchStatus()), POLLING_INTERVAL);
  }
}

export const SLIDING_STATUS = "SLIDING_STATUS";

export function setSlidingStatus(sliding) {
  return {
    type: SLIDING_STATUS,
    sliding
  };
}