import { COLORS } from '../configs/constants';
import { MOVE_PIECE } from '../actions/game';

const turn = function(state, action) {
  switch(action.type) {
    case MOVE_PIECE:
      return (state == COLORS[0]) ? COLORS[1] : COLORS[0];
    default:
      return COLORS[0];
  }
}

export default turn;
