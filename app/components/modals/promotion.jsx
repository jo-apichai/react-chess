import React, { Component } from 'react'
import { inject, PropTypes as MobXPropTypes } from 'mobx-react'

@inject('game')
class PromotionModal extends Component {
  static propTypes = {
    game: MobXPropTypes.observableObject.isRequired
  }

  _renderOptions () {
    const options = []
    const types = ['queen', 'rook', 'bishop', 'knight']
    const { game } = this.props
    const color = game.promotion.piece.color

    types.forEach((type) => {
      options.push(
        <li className='piece'
          onClick={() => { game.promotePiece(type) }}
          key={type}>
          <img src={`/images/${color}-${type}.png`} />
        </li>
      )
    })

    return options
  }

  render () {
    return (
      <div className='modal-overlay'>
        <div className='promotion-modal'>
          <div className='title'>
            Please select a replacement for<br />
            the pawn reached the eighth rank
          </div>

          <ul className='pieces'>
            {this._renderOptions()}
          </ul>
        </div>
      </div>
    )
  }
}

export default PromotionModal
