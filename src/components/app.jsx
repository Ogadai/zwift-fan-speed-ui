import React, { Component, PropTypes } from 'react';
import FanSpeed from './fan-speed';

import s from './app.css';

export default class App extends Component {
  render() {
    return (
      <div className="zwift-app">
        <FanSpeed />
      </div>
    )
  }
}
