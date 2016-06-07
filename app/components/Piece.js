import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ClassNames from 'classnames';

import { COLORS, PIECES, DND_PIECE } from '../configs/constants';

class Piece extends Component {
  render() {
    const { connectDragSource } = this.props;

    let pieceClass = `${this.props.color}-${this.props.type}`;

    return connectDragSource(
      <div className={ClassNames('piece', pieceClass)}>
        <img src={`/images/${pieceClass}.png`} />
      </div>
    );
  }
}

Piece.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  type: PropTypes.oneOf(PIECES).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

const pieceSource = {
  beginDrag(props) {
    return { x: props.x, y: props.y };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(DND_PIECE, pieceSource, collect)(Piece);
