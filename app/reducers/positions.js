import { STARTING_POSITIONS } from '../configs/constants';
import { MOVE_PIECE } from '../actions/game';

const positions = function(state, action) {
  switch(action.type) {
    case MOVE_PIECE:
      return state;
    default:
      return getStartingPositions();
  }
}

function getStartingPositions() {
  let pos = {}

  for(let i = 0; i < 64; i++) {
    let x = (i % 8) + 1;
    let y = Math.floor(i / 8) + 1;
    let piece = STARTING_POSITIONS[i] || null;

    pos[`${x}-${y}`] = piece;
  }

  return pos;
}

export default positions;
