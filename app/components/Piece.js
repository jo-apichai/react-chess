import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ClassNames from 'classnames';

import { COLORS, PIECES, DND_PIECE } from '../configs/constants';

class Piece extends Component {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className={ClassNames('piece', this._getPieceName())}>
        <img src={this._getPieceImage()} />
      </div>
    );
  }

  componentDidMount() {
    let img = new Image();
    img.src = this._getPieceImage();
    img.onload = () => this.props.connectDragPreview(img);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.color !== nextProps.color) {
      let img = new Image();
      img.src = `/images/${nextProps.color}-${nextProps.type}.png`;
      img.onload = () => this.props.connectDragPreview(img);
    }
  }

  _getPieceName() {
    return `${this.props.color}-${this.props.type}`;
  }

  _getPieceImage() {
    return `/images/${this._getPieceName()}.png`;
  }
}

Piece.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  type: PropTypes.oneOf(PIECES).isRequired,
  moved: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

const pieceSource = {
  beginDrag(props) {
    return {
      x: props.x,
      y: props.y,
      color: props.color,
      type: props.type,
      moved: props.moved
    };
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
