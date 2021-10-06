import { boardService } from '../../services/board-service.js';

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.getBoardsPrm();
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadBoard(boardId, setIsLoaded) {
  return async (dispatch) => {
    try {
      const board = await boardService.getBoardPrm(boardId);
      dispatch({ type: 'SET_BOARD', board });
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
}

export function onSaveBoard(board) {
  return async (dispatch) => {
    try {
      const newBoard = await boardService.updateBoardPrm({
        id: board._id,
        title: board.title,
        groups: board.groups,
        style: board.style,
        activities: board.activities,
      });
      dispatch({ type: 'SAVE_BOARD', board });
    } catch (err) {
      console.log('BoardActions: err in onSaveBoard', err);
    }
  };
}

export function setBoards(boards) {
  return async (dispatch) => {
    try {
      boardService._save('boardsDB', boards);
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.log('BoardActions: err in onSaveBoard', err);
    }
  };
}
