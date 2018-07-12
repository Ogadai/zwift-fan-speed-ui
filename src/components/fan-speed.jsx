import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slider';
import classnames from 'classnames';

import { pollServer, setFanSpeed, setManualMode, setHearRateMode, setSlidingStatus } from '../actions';

import s from './fan-speed.css';

class FanSpeed extends Component {
  static get propTypes() {
    return {
      fanSpeed: PropTypes.object.isRequired,
      manual: PropTypes.bool,
      heartRate: PropTypes.bool,
      riding: PropTypes.bool,
      onStartPoll: PropTypes.func.isRequired,
      onSet: PropTypes.func.isRequired,
      onSetManual: PropTypes.func.isRequired,
      onSetHearRate: PropTypes.func.isRequired,
      onSetSlidingStatus: PropTypes.func.isRequired
    };
  }

  componentDidMount() {
    this.props.onStartPoll();
  }

  render() {
    const { fanSpeed, manual, heartRate, riding, onSet, onSetSlidingStatus } = this.props;
    const disabled = riding && !manual;
    return (
      <div className={classnames("fan-speed", this.getFanClass(fanSpeed.fan))}>
        <Slider
          min={0}
					max={100}
					value={fanSpeed.fan * 100}
          onChange={speed => onSet(speed / 100)}
          onBeforeChange={() => onSetSlidingStatus(true)}
          onAfterChange={() => onSetSlidingStatus(false)}
          orientation="vertical"
          disabled={disabled}
					/>
        <div className="status">
          {(riding && !manual) && <span className="fan-heartrate">
            <input id="fanHeartRate" type="checkbox" checked={heartRate} onClick={() => this.toggleHeartRate()} />
            <label htmlFor="fanHeartRate"></label>
          </span>}
          <span className="speed">{fanSpeed.speed}</span>
          {riding && <span className="fan-checkbox">
            <input id="fanManual" type="checkbox" checked={manual} onClick={() => this.toggleManual()} />
            <label htmlFor="fanManual"></label>
          </span>}
        </div>
			</div>
    )
  }

  toggleManual() {
    const { manual, onSetManual } = this.props;
    onSetManual(!manual);
  }
  
  toggleHeartRate() {
    const { heartRate, onSetHearRate } = this.props;
    onSetHearRate(!heartRate);
  }

  getFanClass(fan) {
    const speedClass = Math.round(fan * 10);
    return `fan-${speedClass}`;
  }

}

const mapStateToProps = (state) => {
  return {
    fanSpeed: state.fanSpeed,
    manual: state.status.manual,
    heartRate: state.status.heartRate,
    riding: !!state.status.riding
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartPoll: () => dispatch(pollServer()),
    onSet: speed => dispatch(setFanSpeed(speed)),
    onSetManual: manual => dispatch(setManualMode(manual)),
    onSetHearRate: heartRate => dispatch(setHearRateMode(heartRate)),
    onSetSlidingStatus: sliding => dispatch(setSlidingStatus(sliding))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FanSpeed);
