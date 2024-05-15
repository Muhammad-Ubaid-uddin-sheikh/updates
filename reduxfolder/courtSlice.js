const initialState = {
  courtId: null,
  playerId: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COURTId':
      return {
        ...state,
        courtId: action.payload.courtId // Adjusted payload key
      };case 'CLEAR_COURT_ID':
      return {
        ...state,
        courtId: null,
      };
    case 'PLAYERId':
      return {
        ...state,
        playerId: action.payload.playerId, // Adjusted payload key
      };
    default:
      return state;
  }
};

export default userReducer;
