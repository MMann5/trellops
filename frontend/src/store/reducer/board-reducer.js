import { boardService } from '../../services/board-service.js';

const initialState = {
  boards: boardService.getBoards(),
  board: boardService.getBoards()[0],
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    case 'SET_BOARD':
      return { ...state, board: action.board };
    case 'SAVE_BOARD':
      return { ...state, board: action.board };
    default:
      return state;
  }
}
