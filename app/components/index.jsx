import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import game from '../reducers/game';
import ChessBoard from '../containers/ChessBoard';

let store = createStore(game);

ReactDOM.render((
  <Provider store={store}>
    <ChessBoard />
  </Provider>
), document.getElementById("container"));
