import { configureStore } from '@reduxjs/toolkit';
import type { ActionCreator, AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import { rootReducer } from './slices';
// import { api } from '../slices/api/api';
// import { authApi } from '../slices/api/auth-api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    // authApi.middleware,
    // api.middleware,
  ]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = any> = ActionCreator<ThunkAction<ReturnType, RootState, any, AnyAction>>;

export default store;