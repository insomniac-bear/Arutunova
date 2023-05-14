import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'auth/admin-signin',
        method: 'POST',
        body: {
          username: data.email,
          password: data.password,
        }
      })
    }),
  }),
});

export const {
  useSignupMutation,
} = authApi;
