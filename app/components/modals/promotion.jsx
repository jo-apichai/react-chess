import React, { Component } from 'react'
import { inject } from 'mobx-react'

@inject('game')
class PromotionModal extends Component {
  render() {
    return (
      <div className="modal-overlay">
        <div className="promotion-modal">
          <div className="title">
            Please select a replacement for<br/>
            the pawn reached the eighth rank
          </div>

          <ul className="pieces">
            {this._renderOptions()}
          </ul>
        </div>
      </div>
    )
  }

  _renderOptions() {
    const options = []
    const pieces = ['queen', 'rook', 'bishop', 'knight']
    const { game } = this.props
    const color = game.promotion.piece.color

    pieces.forEach((piece) => {
      options.push(
        <li className="piece"
            onClick={() => { game.promotePiece(piece) }}
            key={piece}>
          <img src={`/images/${color}-${piece}.png`} />
        </li>
      )
    })

    return options
  }
}

export default PromotionModal
