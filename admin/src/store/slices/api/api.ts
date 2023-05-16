import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ApiUrls } from '../../../const/urls.const';
import { getCookie } from '../../../util/cookie';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrls.BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie('token');

      if (token !== undefined && token !== '') {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: () => ({}),
});
