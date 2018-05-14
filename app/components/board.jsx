import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react'

import Square from './square.jsx'
import PromotionModal from './modals/promotion.jsx'

@inject('game')
@DragDropContext(HTML5Backend)
@observer
class Board extends Component {
  static propTypes = {
    game: MobXPropTypes.observableObject.isRequired
  }

  _renderSquares () {
    let squares = []

    for (let i = 0; i < 64; i++) {
      let x = (i % 8) + 1
      let y = Math.floor(i / 8) + 1
      let color = ((x + y) % 2) ? 'black' : 'white'

      squares.push(
        <Square x={x} y={y} color={color} key={i} />
      )
    }

    return squares
  }

  _renderPromotionModal () {
    const { game } = this.props

    return game.promotion.active ? <PromotionModal /> : null
  }

  render () {
    return (
      <div id='board'>
        {this._renderSquares()}
        {this._renderPromotionModal()}
      </div>
    )
  }
}

export default Board
