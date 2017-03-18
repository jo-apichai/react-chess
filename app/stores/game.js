import { observable } from 'mobx'

import { STARTING_POSITIONS } from '../config.js'

export default class Game {
  @observable positions = this._getStartingPositions()
  @observable turn = 'white'

  _getStartingPositions() {
    const positions = {}

    for(let i = 0; i < 64; i++) {
      let piece = STARTING_POSITIONS[i] || null
      positions[i] = piece
    }

    return positions
  }

  movePiece(piece, target) {
    const fromPosition = this._getPiecePosition(piece.x, piece.y)
    const toPosition = this._getPiecePosition(target.x, target.y)
    if(fromPosition === toPosition) { return }

    this.positions[toPosition] = this.positions[fromPosition]
    this.positions[fromPosition] = null
  }

  _getPiecePosition(x, y) {
    return parseInt(`${y - 1}${x - 1}`, 8)
  }
}
