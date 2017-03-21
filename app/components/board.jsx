import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { observer, inject } from 'mobx-react'

import Square from './square.jsx'
import PromotionModal from './modals/promotion.jsx'

@inject('game')
@DragDropContext(HTML5Backend)
@observer
class Board extends Component {
  render() {
    return (
      <div id="board">
        {this._renderSquares()}
        {this._renderPromotionModal()}
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

  _renderPromotionModal() {
    const { game } = this.props
    if(!game.promotion.active) { return null }

    return <PromotionModal/>
  }
}

export default Board
