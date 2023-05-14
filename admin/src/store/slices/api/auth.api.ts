import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ApiUrls } from '../../../const/urls.const';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrls.BASE_URL,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${ApiUrls.AUTH}${ApiUrls.SIGN_IN}`,
        method: 'POST',
        body: data,
      })
    }),
  }),
});

export const {
  useSignupMutation,
} = authApi;
