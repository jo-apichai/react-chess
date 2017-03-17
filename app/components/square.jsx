import React, { Component,PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import ClassNames from 'classnames';

import Piece from './piece.jsx'
import { COLORS } from '../config.js'

@inject('game')
@observer
class Square extends Component {
  render() {
    return (
      <div className={ClassNames('square', this.props.color)}>
        {this._renderPiece()}
      </div>
    )
  }

  _renderPiece() {
    const { game, position } = this.props
    const piece = game.positions[position]
    if(piece === null) { return null }

    return (
      <Piece color={piece.color} type={piece.type} />
    )
  }
}

Square.propTypes = {
  position: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired
}

export default Square
