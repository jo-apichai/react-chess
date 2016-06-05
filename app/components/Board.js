import React, { Component } from 'react';

import Square from './Square';
import Piece from './Piece';

export default class Board extends Component {
  render() {
    return (
      <div id="board">
        { this._renderSquares() }
      </div>
    );
  }

  _renderSquares() {
    let squares = [];

    for(let i = 0; i < 64; i++) {
      let x = (i % 8) + 1;
      let y = Math.floor(i / 8) + 1;
      let color = ((x + y) % 2) ? 'black' : 'white';

      squares.push(
        <Square color={color} key={i}>
          {this._getPieceAtSquare(x, y)}
        </Square>
      );
    }

    return squares;
  }

  _getPieceAtSquare(x, y) {
    let piece = this.props.positions[`${x}-${y}`];

    if(piece) {
      return <Piece color={piece.color} type={piece.type} />;
    }

    return null;
  }
}
