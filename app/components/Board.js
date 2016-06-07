import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Square from './Square';
import Piece from './Piece';

class Board extends Component {
  render() {
    return (
      <div id="board">
        { this._renderSquares() }
      </div>
    );
  }

  _renderSquares() {
    let squares = [];
    let { movePiece } = this.props;

    for(let i = 0; i < 64; i++) {
      let x = (i % 8) + 1;
      let y = Math.floor(i / 8) + 1;
      let color = ((x + y) % 2) ? 'black' : 'white';

      squares.push(
        <Square x={x} y={y} color={color} key={i} movePiece={movePiece}>
          {this._getPieceAtSquare(x, y)}
        </Square>
      );
    }

    return squares;
  }

  _getPieceAtSquare(x, y) {
    let piece = this.props.positions[`${x}-${y}`];

    if(piece) {
      return <Piece color={piece.color} type={piece.type} x={x} y={y} />;
    }

    return null;
  }
}

Board.propTypes = {
  positions: PropTypes.object.isRequired,
  movePiece: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(Board);
