import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Square from './square.jsx'

@DragDropContext(HTML5Backend)
class Board extends Component {
  render() {
    return (
      <div id="board">
        {this._renderSquares()}
      </div>
    )
  }

  _renderSquares() {
    let squares = []

    for(let i = 0; i < 64; i++) {
      let x = (i % 8) + 1
      let y = Math.floor(i / 8) + 1
      let color = ((x + y) % 2) ? 'black' : 'white'

      squares.push(
        <Square x={x} y={y} color={color} key={i}>
        </Square>
      )
    }

    return squares
  }
}

export default Board
