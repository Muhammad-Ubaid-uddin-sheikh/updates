import { configureStore } from '@reduxjs/toolkit';
import courtReducer from './courtSlice';

const store = configureStore({
  reducer: {
    court: courtReducer,
  },
});

export default store;