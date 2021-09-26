import { boardService } from '../../services/board-service.js';
const initialState = {
  boards: boardService.getBoards(),
};
export function boardReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case 'SET_BOARDS':
      newState = { ...state, boards: action.boards };
      break;
    default:
      return state;
  }
  // For debug:
  console.log('Prev State:', state);
  console.log('Action:', action);
  console.log('New State:', newState);
  return newState;
}
