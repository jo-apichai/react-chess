import React, { Component, PropTypes } from 'react'
import ClassNames from 'classnames'

import { COLORS, PIECES } from '../config.js'

class Piece extends Component {
  render() {
    return (
      <div className={ClassNames('piece', this._getPieceName())}>
        <img src={this._getPieceImage()} />
      </div>
    )
  }

  _getPieceName() {
    return `${this.props.color}-${this.props.type}`;
  }

  _getPieceImage() {
    return `/images/${this._getPieceName()}.png`;
  }
}

Piece.propTypes = {
  color: PropTypes.oneOf(COLORS).isRequired,
  type: PropTypes.oneOf(PIECES).isRequired
}

export default Piece
