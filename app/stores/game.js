import { observable } from 'mobx'

import { STARTING_POSITIONS } from '../config.js'

export default class Game {
  @observable positions = this._getStartingPositions()
  @observable turn = 'white'

  _getStartingPositions() {
    let positions = {}

    for(let i = 0; i < 64; i++) {
      let piece = STARTING_POSITIONS[i] || null;
      positions[i] = piece;
    }

    return positions;
  }
}
