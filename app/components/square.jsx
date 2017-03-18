import React, { Component,PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import ClassNames from 'classnames'
import { DropTarget } from 'react-dnd'

import Piece from './piece.jsx'
import { COLORS, DND_PIECE } from '../config.js'

const squareTarget = {
  drop(props, monitor) {
    props.game.movePiece(
      monitor.getItem(),
      { x: props.x, y: props.y }
    )
  }

  // canDrop(props, monitor) {
  //   let piece = monitor.getItem();
  //   let target = { x: props.x, y: props.y };

  //   switch(true) {
  //     case (piece.color !== props.turn):
  //       return false;
  //       break;
  //     case (piece.x === target.x && piece.y === target.y):
  //       return false;
  //       break;
  //     default:
  //       return props.isMoveValid(piece, target);
  //   }
  // }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

@inject('game')
@observer
@DropTarget(DND_PIECE, squareTarget, collect)
class Square extends Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
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
      </div>
    )
  }

  _renderPiece() {
    const { game, position, x, y } = this.props
    const piece = game.positions[position]
    if(piece === null) { return null }

    return (
      <Piece x={x} y={y} color={piece.color} type={piece.type} />
    )
  }
}

export default Square
