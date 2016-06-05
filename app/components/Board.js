import React, { Component } from 'react';

import { START_POSITIONS } from '../configs/constants';
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
      let piece;

      if(START_POSITIONS[i]) {
        let p = START_POSITIONS[i];
        piece = <Piece type={p.type} color={p.color} />
      }

      squares.push(
        <Square color={color} key={i}>
          {piece}
        </Square>
      );
    }

    return squares;
  }
}
