import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

import { COLORS, PIECES } from '../configs/constants';

export default class Piece extends Component {
  render() {
    let piece = `${this.props.color}-${this.props.type}`;

    return(
      <div className={ClassNames('piece', piece)}>
        <img src={`/images/${this.props.color}_${this.props.type}.png`} />
      </div>
    );
  }
}

Piece.propTypes = {
  type: PropTypes.oneOf(PIECES).isRequired,
  color: PropTypes.oneOf(COLORS).isRequired
}
