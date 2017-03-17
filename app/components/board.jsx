import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Square from './square.jsx'

@inject('game')
@observer
class Board extends Component {
  render() {
    return (
      <div id="board">
        {this._renderSquares()}
      </div>
    )
  }

  _renderSquares() {
    let squares = [];

    for(let i = 0; i < 64; i++) {
      let x = (i % 8) + 1;
      let y = Math.floor(i / 8) + 1;
      let color = ((x + y) % 2) ? 'black' : 'white';

      squares.push(
        <Square position={i} x={x} y={y} color={color} key={i}>
        </Square>
      );
    }

    return squares;
  }
}

export default Board
