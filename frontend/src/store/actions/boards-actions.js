import { boardService } from '../../services/board-service.js';

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query();
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadBoard(boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.getBoardById(boardId);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.log(err);
    }
  };
}

export function onSaveBoard(board) {
  return async (dispatch) => {
    try {
      // const savedBoard = await boardService._save(board);
      dispatch({ type: 'SAVE_BOARD', board });
    } catch (err) {
      console.log('BoardActions: err in onSaveBoard', err);
    }
  };
}

export function createBoard(board) {
  return async (dispatch) => {
    try {
      const savedBoard = await boardService._save(board);
      dispatch({ type: 'SET_BOARD', board: savedBoard });
    } catch (err) {
      console.log('BoardActions: err in onSaveBoard', err);
    }
  };
}
export function unsetBoard() {
  return (dispatch) => {
    dispatch({ type: 'SET_BOARD', board: null });
  };
}
