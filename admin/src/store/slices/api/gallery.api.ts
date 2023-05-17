import { ApiUrls } from '../../../const/urls.const';
import { IPhoto } from '../../../types/gallery.types';
import { setGallery } from '../gallery/gallery.slice';
import { api } from './api';

export const galleryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhotos: builder.query<IPhoto[], undefined>({
      query: () => ({
        url: ApiUrls.PHOTOS,
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
          await queryFulfilled
            .then((res) => {
              dispatch(setGallery(res.data));
            });
      },
      providesTags: ['Gallery'],
    }),

    uploadPhoto: builder.mutation<{ url: string }, File>({
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

    deletePhoto: builder.mutation<null, string>({
      query: (url: string) => {
        const fileName = url.split('/').at(-1);
        console.log(fileName);

        return ({
          url: `${ApiUrls.PHOTOS}/upload/${fileName}`,
          method: 'DELETE',
        });
      },
    }),

    savePhoto: builder.mutation<IPhoto, any>({
      query: (data) => ({
        url: ApiUrls.PHOTOS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Gallery'],
    }),

  }),
});

export const {
  useDeletePhotoMutation,
  useSavePhotoMutation,
  useUploadPhotoMutation,
} = galleryApi;
