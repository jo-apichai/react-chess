import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'

import Board from './components/board.jsx'
import Game from './stores/game.js'

const game = new Game()

ReactDom.render(
  <Provider game={game}>
    <Board />
  </Provider>,
  document.getElementById('container')
)
