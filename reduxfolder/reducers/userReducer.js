
const initialState = {
    name: '',
    email: '',
    Username: '',
    Feildpassword: '',
    selectedText: '',
    dateOfBirth:'',
    selectedItem: '',
    selectedCountry:'',
    jerseyNumber:''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SIGNUP_DATA':
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                Username: action.payload.Username,
                Feildpassword: action.payload.Feildpassword,
                dateOfBirth:action.payload.dateOfBirth
            };
        case 'SET_USER_ROLE':
            return {
                ...state,
                selectedText: action.payload.selectedText,
            };
            case 'SET_USER_FOOT':
            return {
                ...state,
                selectedItem: action.payload.selectedItem,
            };
            case 'SET_COUNTRY_ROLE':
                return {
                    ...state,
                    selectedCountry: action.payload.selectedCountry,
                };
                case 'SET_JARASEY_ROLE':
                return {
                    ...state,
                    jerseyNumber: action.payload.jerseyNumber,
                };
        default:
            return state;
    }
};

export default userReducer;
