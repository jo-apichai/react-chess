import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import ClassNames from 'classnames';

import { COLORS, DND_PIECE } from '../configs/constants';

class Square extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;

    let overlay;
    switch(true) {
      case (isOver && canDrop):
        overlay = this._renderOverlay('green');
        break;
      case (isOver && !canDrop):
        overlay = this._renderOverlay('red');
        break;
      case (!isOver && canDrop):
        overlay = this._renderOverlay('yellow');
        break;
    }

    return connectDropTarget(
      <div className={ClassNames('square', this.props.color)}>
        {this.props.children}
        {overlay}
      </div>
    );
  }

  _renderOverlay(color) {
    return(
      <div className={ClassNames('overlay', color)}></div>
    )
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  turn: PropTypes.string.isRequired,
  movePiece: PropTypes.func.isRequired,
  isMoveValid: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

const squareTarget = {
  drop(props, monitor) {
    props.movePiece(
      monitor.getItem(),
      { x: props.x, y: props.y }
    );
  },

  canDrop(props, monitor) {
    let piece = monitor.getItem();
    let target = { x: props.x, y: props.y };

    switch(true) {
      case (piece.color !== props.turn):
        return false;
        break;
      case (piece.x === target.x && piece.y === target.y):
        return false;
        break;
      default:
        return props.isMoveValid(piece, target);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export default DropTarget(DND_PIECE, squareTarget, collect)(Square);
