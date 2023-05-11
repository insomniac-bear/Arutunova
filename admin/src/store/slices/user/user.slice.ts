import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

const initialState = {
  data: null,
  auth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const getUser = (state: RootState) => state.user;