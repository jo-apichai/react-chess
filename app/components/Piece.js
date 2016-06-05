import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

import { COLORS, PIECES } from '../configs/constants';

export default class Piece extends Component {
  render() {
    let pieceClass = `${this.props.color}-${this.props.type}`;

    return(
      <div className={ClassNames('piece', pieceClass)}>
        <img src={`/images/${pieceClass}.png`} />
      </div>
    );
  }
}

Piece.propTypes = {
  color: PropTypes.oneOf(COLORS).isRequired,
  type: PropTypes.oneOf(PIECES).isRequired
}
