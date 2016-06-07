import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import ClassNames from 'classnames';

import { COLORS, DND_PIECE } from '../configs/constants';

class Square extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={ClassNames('square', this.props.color)}>
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  movePiece: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
}

const squareTarget = {
  drop(props, monitor) {
    props.movePiece(
      monitor.getItem(),
      { x: props.x, y: props.y }
    );
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(DND_PIECE, squareTarget, collect)(Square);
