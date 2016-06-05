import React, { Component } from 'react';

import Square from './Square';

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

    for(let x = 1; x < 9; x++) {
      for(let y = 1; y < 9; y++) {
        let color = ((x + y) % 2) ? 'black' : 'white';

        squares.push(
          <Square color={color} key={`${x}-${y}`} />
        );
      }
    }

    return squares;
  }
}
