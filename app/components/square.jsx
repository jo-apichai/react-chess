import React, { Component,PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import ClassNames from 'classnames'
import { DropTarget } from 'react-dnd'

import Piece from './piece.jsx'
import { COLORS, DND_PIECE } from '../config.js'

const squareTarget = {
  drop(props, monitor) {
    const { game, x, y } = props
    const piece = monitor.getItem()
    const target = { x, y }

    game.movePiece(piece, target)
  },

  canDrop(props, monitor) {
    const { game, x, y } = props
    const piece = monitor.getItem()
    const target = { x, y }

    return game.isMoveValid(piece, target)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

@inject('game')
@DropTarget(DND_PIECE, squareTarget, collect)
@observer
class Square extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.oneOf(COLORS).isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  }

  render() {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div className={ClassNames('square', this.props.color)}>
        {this._renderPiece()}
        {this._renderOverlay()}
      </div>
    )
  }

  _renderPiece() {
    const { game, x, y } = this.props
    const piece = game.getPieceAtSquare(x, y)
    if(piece === null) { return null }

    return (
      <Piece x={x} y={y} color={piece.color} type={piece.type} />
    )
  }

  _renderOverlay() {
    const { isOver, canDrop } = this.props
    let color = null

    switch(true) {
      case (isOver && canDrop):
        color = 'green'
        break
      case (isOver && !canDrop):
        color = 'red'
        break
      case (!isOver && canDrop):
        color = 'yellow'
        break
    }

    if(color === null) { return null }

    return <div className={ClassNames('overlay', color)}></div>
  }
}

export default Square
