import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slider';
import classnames from 'classnames';

import { pollServer, setFanSpeed, setManualMode } from '../actions';

import s from './fan-speed.css';

class FanSpeed extends Component {
  static get propTypes() {
    return {
      fanSpeed: PropTypes.object.isRequired,
      manual: PropTypes.bool,
			riding: PropTypes.bool,
      onStartPoll: PropTypes.func.isRequired,
      onSet: PropTypes.func.isRequired,
      onSetManual: PropTypes.func.isRequired
    };
  }

  componentDidMount() {
    this.props.onStartPoll();
  }

  render() {
    const { fanSpeed, manual, riding, onSet } = this.props;
    const disabled = riding && !manual;
    return (
      <div className={classnames("fan-speed", this.getFanClass(fanSpeed.fan), { disabled })}>
        <Slider
          min={15}
					max={75}
					value={fanSpeed.speed}
          onChange={onSet}
          orientation="vertical"
          disabled={disabled}
					/>
        <div className="status">
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

  getFanClass(fan) {
    const speedClass = Math.round(fan * 10);
    return `fan-${speedClass}`;
  }

}

const mapStateToProps = (state) => {
  return {
    fanSpeed: state.fanSpeed,
    manual: state.status.manual,
		riding: !!state.status.riding
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartPoll: () => dispatch(pollServer()),
    onSet: speed => dispatch(setFanSpeed(speed)),
    onSetManual: manual => dispatch(setManualMode(manual))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FanSpeed);
