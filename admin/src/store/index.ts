import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { api } from './slices/api/api';
import { authApi } from './slices/api/auth.api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([
        authApi.middleware,
        api.middleware,
      ]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
