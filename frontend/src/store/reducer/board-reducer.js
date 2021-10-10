const initialState = {
  boards: [],
  board: {},
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
