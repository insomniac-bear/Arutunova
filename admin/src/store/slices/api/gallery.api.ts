import { ApiUrls } from '../../../const/urls.const';
import { IPhoto } from '../../../types/gallery.types';
import { api } from './api';

export const galleryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhotos: builder.query<IPhoto[], undefined>({
      query: () => ({
        url: ApiUrls.PHOTOS,
        method: 'GET',
      }),
    }),

    uploadPhoto: builder.mutation<string, File>({
      query: (file: File) => {
        const formData = new FormData();
        formData.append('gallery', file);

        return ({
          url: `${ApiUrls.PHOTOS}/upload`,
          method: 'POST',
          body: formData,
        })
      },
    }),

  }),
});

export const { useUploadPhotoMutation } = galleryApi;
