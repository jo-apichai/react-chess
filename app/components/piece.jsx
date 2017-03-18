import React, { Component, PropTypes } from 'react'
import ClassNames from 'classnames'
import { DragSource } from 'react-dnd'

import { COLORS, PIECES, DND_PIECE } from '../config.js'

const pieceSource = {
  beginDrag(props) {
    return {
      x: props.x,
      y: props.y,
      color: props.color,
      type: props.type
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  }
}

@DragSource(DND_PIECE, pieceSource, collect)
class Piece extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.oneOf(COLORS).isRequired,
    type: PropTypes.oneOf(PIECES).isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
  }

  componentDidMount() {
    const img = new Image()
    img.src = this._getPieceImage()
    img.onload = () => this.props.connectDragPreview(img)
  }

  componentWillUpdate(nextProps) {
    const img = new Image()
    img.src = `/images/${nextProps.color}-${nextProps.type}.png`
    img.onload = () => this.props.connectDragPreview(img)
  }

  render() {
    const { connectDragSource } = this.props

    return connectDragSource(
      <div className={ClassNames('piece', this._getPieceName())}>
        <img src={this._getPieceImage()} />
      </div>
    )
  }

  _getPieceName() {
    return `${this.props.color}-${this.props.type}`
  }

  _getPieceImage() {
    return `/images/${this._getPieceName()}.png`
  }
}

export default Piece
