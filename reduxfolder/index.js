import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import teamReducer from './reducers/teamReducer'
import imageReducer from './reducers/FeildSelect'
import ID from './courtSlice'
import ChaMessages from './ChatMesssages'
const rootReducer = combineReducers({
    user: userReducer,
    team: teamReducer,
    image: imageReducer,
    ID: ID,
    ChaMessages:ChaMessages
  
});

export default rootReducer;
