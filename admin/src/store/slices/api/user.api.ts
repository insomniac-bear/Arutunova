import { ApiUrls } from '../../../const/urls.const';
import { IUserResponse } from '../../../types/user.type';
import { setCookie } from '../../../util/cookie';
import { setAuth, setUserData } from '../user/user.slice';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<IUserResponse, undefined>({
      query: () => ({
        url: `${ApiUrls.USER}${ApiUrls.ADMIN}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setAuth(true));
          api.dispatch(setUserData(data));
        } catch (err) {
          setCookie('token', '');
          console.log(err);
        }
      },
    }),
  }),
});
