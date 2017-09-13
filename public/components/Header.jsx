import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import logo from '../assets/logo.svg';

export default class Header extends Component {
  static propTypes = {
    selected: PropTypes.shape(),
  };

  render() {
    const { selected } = this.props;

    let details;

    if (selected) {
      details = (
        <div className="details">
          {Object.keys(selected).map(key => {
            return (
              <div {...{ key, className: 'details-entry' }}>
                <span className="entry-key">{key}</span>
                <span className="entry-value">{selected[key]}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="sequence-header">
        {!details && <div className={classnames('heading', { min: details })}>
          <img src={logo} className="sequence-logo" alt="logo" />
          <h2>Welcome to Sequence</h2>
        </div>}
        {details}
      </div>
    );
  }
}
