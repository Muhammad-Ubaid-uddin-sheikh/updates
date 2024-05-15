const initialState = {
    messagesUpdate: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SetMessage':
        return {
          ...state,
          messagesUpdate: action.payload.messages // Adjusted payload key
        };
        case 'UpdateMessage':
        return {
          ...state,
          messagesUpdate: action.payload.messages // Adjusted payload key
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  