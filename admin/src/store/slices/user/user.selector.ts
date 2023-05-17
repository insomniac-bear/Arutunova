import { RootState } from '../..';

export const getAuthStatus = (state: RootState) => state.user.auth;
export const getUser = (state: RootState) => state.user;
