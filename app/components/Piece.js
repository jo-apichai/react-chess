import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ClassNames from 'classnames';

import { COLORS, PIECES, DND_PIECE } from '../configs/constants';

class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = { pieceName: `${this.props.color}-${this.props.type}` };
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className={ClassNames('piece', this.state.pieceName)}>
        <img src={this._getPieceImage()} />
      </div>
    );
  }

  componentDidMount() {
    let img = new Image();
    img.src = this._getPieceImage();
    img.onload = () => this.props.connectDragPreview(img);
  }

  _getPieceImage() {
    return `/images/${this.state.pieceName}.png`;
  }
}

Piece.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  type: PropTypes.oneOf(PIECES).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
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
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(DND_PIECE, pieceSource, collect)(Piece);
