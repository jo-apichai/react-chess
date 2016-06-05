export const MOVE_PIECE = 'MOVE_PIECE';

export function movePiece(from, to) {
  return { type: MOVE_PIECE, from, to };
}
