import { RootState } from "../..";

export const getAuthStatus = (state: RootState) => state.user.auth;