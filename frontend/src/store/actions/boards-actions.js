import { boardService } from '../../services/board-service.js';

export function loadBoards() {
  return (dispatch) => {
    boardService
      .fetchBoards()
      .then((boards) => {
        console.log('Boards from DB:', boards);
        dispatch({
          type: 'SET_BOARDS',
          boards,
        });
      })
      .catch((err) => {
        console.log('Cannot load boards', err);
      });
  };
}

export function setBoards(boards) {
  return (dispatch) => {
    dispatch({
      type: 'SET_BOARDS',
      boards,
    });
  };
}
