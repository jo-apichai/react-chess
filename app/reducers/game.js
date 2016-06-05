import { combineReducers } from 'redux';

import positions from './positions';
import turn from './turn';

const game = combineReducers({ positions, turn });

export default game;
