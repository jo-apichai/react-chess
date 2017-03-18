import { observable, action } from 'mobx'

import { COLORS, STARTING_POSITIONS } from '../config.js'

export default class Game {
  @observable positions = this._getStartingPositions()
  @observable turn = COLORS[0]

  _getStartingPositions() {
    const positions = {}

    for(let i = 0; i < 64; i++) {
      let piece = STARTING_POSITIONS[i] || null
      positions[i] = piece
    }

    return positions
  }

  getPieceAtSquare(x, y) {
    return this.positions[this._getSquarePosition(x, y)]
  }

  _getSquarePosition(x, y) {
    return parseInt(`${y - 1}${x - 1}`, 8)
  }

  @action
  movePiece(piece, target) {
    const fromPosition = this._getSquarePosition(piece.x, piece.y)
    const toPosition = this._getSquarePosition(target.x, target.y)
    if(fromPosition === toPosition) { return }

    this.positions[toPosition] = this.positions[fromPosition]
    this.positions[fromPosition] = null
    this._changeTurn()
  }

  @action
  _changeTurn() {
    this.turn = (this.turn === COLORS[0]) ? COLORS[1] : COLORS[0]
  }

  isMoveValid(piece, target) {
    const pieceAtTarget = this.getPieceAtSquare(target.x, target.y)

    if(
      (piece.color !== this.turn) ||
      (piece.x === target.x && piece.y === target.y) ||
      (pieceAtTarget && piece.color === pieceAtTarget.color)
    ) {
      return false
    }

    switch(piece.type) {
      case 'pawn':
        return this._canMovePawn(piece, target, pieceAtTarget)
      case 'rook':
        return this._canMoveRook(piece, target)
      case 'knight':
        return this._canMoveKnight(piece, target)
      case 'bishop':
        return this._canMoveBishop(piece, target)
      case 'queen':
        return this._canMoveQueen(piece, target)
      case 'king':
        return this._canMoveKing(piece, target)
    }
  }

  _getMoveDirection(color) {
    return (color === 'white') ? -1 : 1
  }

  _canMovePawn(piece, target, pieceAtTarget) {
    const dx = target.x - piece.x
    const dy = target.y - piece.y
    const moveDirection = this._getMoveDirection(piece.color)
    let atStartingPosition = false

    if(
      (piece.color === 'white' && piece.y === 7) ||
      (piece.color === 'black' && piece.y === 2)
    ) {
      atStartingPosition = true
    }

    switch(true) {
      case (dx === 0 && !pieceAtTarget):
        if(atStartingPosition && dy === (moveDirection * 2)) {
          return !this.getPieceAtSquare(piece.x, piece.y + moveDirection)
        }

        return (dy === moveDirection)
      case (Math.abs(dx) === 1 && dy === moveDirection):
        if(!pieceAtTarget) { return false }

        return (piece.color !== pieceAtTarget.color)
      default:
        return false
    }
  }

  _canMoveRook(piece, target) {
    if(piece.x !== target.x && piece.y !== target.y) {
      return false
    }

    let startPosition, endPosition, x, y

    if(piece.x === target.x) {
      [startPosition, endPosition] = [piece.y, target.y].sort()
      x = piece.x
    } else {
      [startPosition, endPosition] = [piece.x, target.x].sort()
      y = piece.y
    }

    for(let i = (startPosition + 1); i < endPosition; i++) {
      if(this.getPieceAtSquare(x || i, y || i) !== null) {
        return false
      }
    }

    return true
  }

  _canMoveKnight(piece, target) {
    const dx = target.x - piece.x
    const dy = target.y - piece.y

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  }

  _canMoveBishop(piece, target) {
    const dx = target.x - piece.x
    const dy = target.y - piece.y

    if(Math.abs(dx) !== Math.abs(dy)) {
      return false
    }

    const xMod = (piece.x < target.x) ? 1 : -1
    const yMod = (piece.y < target.y) ? 1 : -1

    for(let i = 1; i < Math.abs(dx); i++) {
      let x = piece.x + (i * xMod)
      let y = piece.y + (i * yMod)

      if(this.getPieceAtSquare(x, y) !== null) {
        return false
      }
    }

    return true
  }

  _canMoveQueen(piece, target) {
    return this._canMoveRook(piece, target) ||
           this._canMoveBishop(piece, target)
  }

  _canMoveKing(piece, target) {
    const dx = target.x - piece.x
    const dy = target.y - piece.y

    if(Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      return false
    }

    return true
  }
}
