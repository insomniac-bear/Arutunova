import { combineReducers } from 'redux';
import { userSlice } from './user/user.slice';
import { api } from './api/api';
import { authApi } from './api/auth.api';
import { gallerySlice } from './gallery/gallery.slice';

export const rootReducer = combineReducers({
  gallery: gallerySlice.reducer,
  user: userSlice.reducer,
  [api.reducerPath]: api.reducer,
  [authApi.reducerPath]: authApi.reducer,
})