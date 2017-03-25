import { observable, action } from 'mobx'

import { COLORS, STARTING_POSITIONS } from '../config.js'

export default class Game {
  @observable positions = this._getStartingPositions()
  @observable turn = COLORS[0]
  @observable promotion = { active: false, piece: null }

  specialMoves = {
    enPassant: null,
    castling: {
      white: { possible: true, movedRook: [] },
      black: { possible: true, movedRook: [] }
    }
  }

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

  _getPositionSquare(i) {
    return {
      x: (i % 8) + 1,
      y: Math.floor(i / 8) + 1
    }
  }

  @action
  movePiece(piece, target) {
    const fromPosition = this._getSquarePosition(piece.x, piece.y)
    const toPosition = this._getSquarePosition(target.x, target.y)
    if(fromPosition === toPosition) { return }

    this.positions[toPosition] = this.positions[fromPosition]
    this.positions[fromPosition] = null

    this._checkSpecialMoves(piece, target)

    this._checkPawnPromotion(piece, target)
    if(this.promotion.active) { return }

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
      (pieceAtTarget && piece.color === pieceAtTarget.color)
    ) {
      return false
    }

    return this._canMovePiece(piece, target, pieceAtTarget)
  }

  _getMoveDirection(color) {
    return (color === 'white') ? -1 : 1
  }

  _canMovePiece(piece, target, pieceAtTarget) {
    if(piece.x === target.x && piece.y === target.y) {
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

  _canMovePawn(piece, target, pieceAtTarget) {
    const dx = target.x - piece.x
    const dy = target.y - piece.y
    const moveDirection = this._getMoveDirection(piece.color)
    const atStartingPosition = this._isPawnAtStartingPosition(piece)

    switch(true) {
      case (Math.abs(dx) > 1):
        return false
      case (Math.abs(dx) === 1):
        return this._canAttackByPawn(piece, target, pieceAtTarget)
      case (dy === moveDirection):
        return !pieceAtTarget
      case (atStartingPosition && dy === (moveDirection * 2)):
        return !this.getPieceAtSquare(piece.x, piece.y + moveDirection)
      default:
        return false
    }
  }

  _isPawnAtStartingPosition(piece) {
    const pawnStartingY = (piece.color === 'white') ? 7 : 2
    return piece.y === pawnStartingY
  }

  _canAttackByPawn(piece, target, pieceAtTarget) {
    const dx = target.x - piece.x
    const dy = target.y - piece.y
    const moveDirection = this._getMoveDirection(piece.color)

    if(Math.abs(dx) !== 1 || dy !== moveDirection) {
      return false
    }

    return !!pieceAtTarget || this._isEnPassantMove(piece, target)
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

    if(Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
      return true
    }

    return this._isCastlingMove(piece, target)
  }

  _isPawnAtEighthRank(piece, target) {
    if(piece.type !== 'pawn') { return false }

    return target.y === this._eighthRankY(piece.color)
  }

  _eighthRankY(color) {
    return (color === 'white') ? 1 : 8
  }

  _checkPawnPromotion(piece, target) {
    if(this._isPawnAtEighthRank(piece, target)) {
      this.promotion = {
        active: true,
        piece: this.getPieceAtSquare(target.x, target.y)
      }
    }
  }

  promotePiece(type) {
    this.promotion.piece.type = type
    this.promotion = { active: false, piece: null }
    this._changeTurn()
  }

  _checkSpecialMoves(piece, target) {
    this._checkEnPassantMove(piece, target)
    this._checkCastlingMove(piece, target)
  }

  _checkEnPassantMove(piece, target) {
    if(this._isEnPassantMove(piece, target)) {
      const { x, y } = this.specialMoves.enPassant.piecePosition
      this.positions[this._getSquarePosition(x, y)] = null
    }

    this._recordEnPassantMove(piece, target)
  }

  _isEnPassantMove(piece, target) {
    if(piece.type !== 'pawn') { return false }

    const { enPassant } = this.specialMoves
    if(!enPassant) { return false }

    const { piecePosition, attackablePosition } = enPassant
    const { x, y } = piecePosition
    const attackablePiece = this.getPieceAtSquare(x, y)

    return piece.color !== attackablePiece.color &&
           target.x === attackablePosition.x &&
           target.y === attackablePosition.y
  }

  _recordEnPassantMove(piece, target) {
    const dy = target.y - piece.y
    const moveDirection = this._getMoveDirection(piece.color)

    if((piece.type !== 'pawn') || (dy !== (moveDirection * 2))) {
      this.specialMoves.enPassant = null
      return
    }

    this.specialMoves.enPassant = {
      piecePosition: target,
      attackablePosition: { x: target.x, y: target.y - moveDirection }
    }
  }

  _checkCastlingMove(piece, target) {
    if(this._isCastlingMove(piece, target)) {
      const dx = target.x - piece.x
      const x = this._castlingRookX(dx)
      const y = piece.y
      const rook = this.getPieceAtSquare(x, y)
      const castlingX = this._castlingTargetX(dx)

      this.positions[this._getSquarePosition(castlingX, y)] = rook
      this.positions[this._getSquarePosition(x, y)] = null
    }

    this._recordCastlingMove(piece)
  }

  _isCastlingMove(piece, target) {
    const { castling } = this.specialMoves
    const color = piece.color
    const dx = target.x - piece.x

    if(
      !castling[color].possible ||
      piece.type !== 'king' ||
      piece.y !== target.y ||
      Math.abs(dx) !== 2
    ) {
      return false
    }

    const rookX = this._castlingRookX(dx)
    if(castling[color].movedRook.indexOf(rookX) >= 0) {
      return false
    }

    let [start, end] = [rookX, piece.x].sort()
    const y = piece.y

    for(let x = (start + 1); x < end; x++) {
      let p = this.getPieceAtSquare(x, y)

      if(p !== null && !(p.type === 'king' && p.color === piece.color)) {
        return false
      }
    }

    [start, end] = [piece.x, target.x].sort()
    for(let x = start; x <= end; x++) {
      if(this._isUnderAttack(piece.color, { x, y })) {
        return false
      }
    }

    return true
  }

  _recordCastlingMove(piece) {
    const { castling } = this.specialMoves
    const color = piece.color

    if(!castling[color].possible) { return }

    switch(piece.type) {
      case 'king':
        castling[color].possible = false
        break
      case 'rook':
        castling[color].movedRook.push(piece.x)

        if(castling[color].movedRook.length > 1) {
          castling[color].possible = false
        }
        break
    }
  }

  _castlingRookX(dx) {
    return (dx < 0) ? 1 : 8
  }

  _castlingTargetX(dx) {
    return (dx < 0) ? 4 : 6
  }

  _isUnderAttack(color, square) {
    const { x, y } = square
    const pieceAtTarget = this.getPieceAtSquare(x, y)

    for(let i = 0; i < 64; i++) {
      let piece = this.positions[i]
      if(piece === null || piece.color === color) { continue }

      piece = {
        ...this._getPositionSquare(i),
        ...piece
      }

      if(piece.type === 'pawn') {
        if(this._canAttackByPawn(piece, square, pieceAtTarget)) {
          return true
        }
      } else {
        if(this._canMovePiece(piece, square)) {
          return true
        }
      }
    }

    return false
  }
}
