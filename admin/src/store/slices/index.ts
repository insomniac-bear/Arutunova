import { combineReducers } from 'redux';
import { userSlice } from './user/user.slice';
import { api } from './api/api';
import { authApi } from './api/auth.api';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  [api.reducerPath]: api.reducer,
  [authApi.reducerPath]: authApi.reducer,
})