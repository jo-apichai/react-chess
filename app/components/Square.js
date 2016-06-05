import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

import { COLORS } from '../configs/constants';

export default class Square extends Component {
  render() {
    return(
      <div className={ClassNames('square', this.props.color)}>
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  color: PropTypes.oneOf(COLORS).isRequired
}
