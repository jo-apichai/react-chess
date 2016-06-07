import { STARTING_POSITIONS } from '../configs/constants';
import { MOVE_PIECE } from '../actions/game';

const positions = function(state, action) {
  switch(action.type) {
    case MOVE_PIECE:
      let { from, to } = action;

      let newState = {};
      let fromXY = `${from.x}-${from.y}`;
      let toXY = `${to.x}-${to.y}`;

      newState[fromXY] = null;
      newState[toXY] = state[fromXY];

      return Object.assign({}, state, newState);
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
