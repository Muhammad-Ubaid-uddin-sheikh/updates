
const initialState = {
    selected: '',
 
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WHICH_GAME':
            return {
                ...state,
                selected: action.payload.selected,
               
            };
        default:
            return state;
    }
};

export default teamReducer;
