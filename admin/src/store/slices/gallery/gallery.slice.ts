import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPhoto } from '../../../types/gallery.types';

const initialState: { photos: IPhoto[] } = {
  photos: []
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGallery: (state, action: PayloadAction<IPhoto[]>) => {
      state.photos = action.payload;
    },

    clearGallery: (state) => {
      state.photos = [];
    }
  },
});

export const {
  setGallery,
  clearGallery,
} = gallerySlice.actions;
