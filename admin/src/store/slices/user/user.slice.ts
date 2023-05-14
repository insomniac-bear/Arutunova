import type { IUser, IUserResponse } from '../../../types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

const initialState: {
  data: IUser;
  auth: boolean;
} = {
  data: {
    id: '',
    email: '',
    full_name: '',
    avatar: '',
    role: undefined,
  },
  auth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUserResponse>) => {
      state.data = { ...action.payload };
    }
  },
});

export const {
  setAuth,
  setUserData,
} = userSlice.actions;

export const getUser = (state: RootState) => state.user;