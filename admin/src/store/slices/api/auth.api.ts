import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'auth/signin',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        }
      })
    }),
  }),
});

export const {
  useSignupMutation,
} = authApi;
