export default class Engine {
  isMoveValid(positions, piece, target) {
    this.positions = positions;
    this.piece = piece;
    this.target = target;

    const pieceAtTarget = this.positions[`${this.target.x}-${this.target.y}`];

    if(pieceAtTarget && pieceAtTarget.color === this.piece.color) {
      return false;
    }

    switch(piece.type) {
      case 'rook':
        return this.canMoveRook();
      case 'knight':
        return this.canMoveKnight();
      case 'bishop':
        return this.canMoveBishop();
      case 'queen':
        return this.canMoveQueen();
      default:
        return true;
    }
  }

  canMoveRook() {
    if(this.piece.x !== this.target.x && this.piece.y !== this.target.y) {
      return false;
    }

    let startPos, endPos, movePattern;
    if(this.piece.x === this.target.x) {
      movePattern = `${this.piece.x}-#`;
      [startPos, endPos] = [this.piece.y, this.target.y].sort();
    } else {
      movePattern = `#-${this.piece.y}`;
      [startPos, endPos] = [this.piece.x, this.target.x].sort();
    }

    for(let i = (startPos + 1); i < endPos; i++) {
      if(this.positions[movePattern.replace('#', i)] !== null) {
        return false;
      }
    }

    return true;
  }

  canMoveKnight() {
    const dx = this.target.x - this.piece.x;
    const dy = this.target.y - this.piece.y;

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  }

  canMoveBishop() {
    const dx = this.target.x - this.piece.x;
    const dy = this.target.y - this.piece.y;

    if(Math.abs(dx) !== Math.abs(dy)) {
      return false;
    }

    let xMod = (this.piece.x < this.target.x) ? 1 : -1;
    let yMod = (this.piece.y < this.target.y) ? 1 : -1;

    for(let i = 1; i < Math.abs(dx); i++) {
      let x = this.piece.x + (i * xMod);
      let y = this.piece.y + (i * yMod);

      if(this.positions[`${x}-${y}`] !== null) {
        return false;
      }
    }

    return true;
  }

  canMoveQueen() {
    return this.canMoveRook() || this.canMoveBishop();
  }
}
