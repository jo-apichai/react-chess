import { connect } from 'react-redux';
import { movePiece } from '../actions/game';
import Board from '../components/Board';

const mapStateToProps = function(state) {
  return {
    turn: state.turn,
    positions: state.positions
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    movePiece: (from, to) => {
      dispatch(movePiece(from, to));
    }
  };
}

const ChessBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default ChessBoard;
