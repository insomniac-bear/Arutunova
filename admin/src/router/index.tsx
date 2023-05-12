import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/root.layout';
import { Paths } from './paths';
import { ProtectedLayout } from '../layouts/protected.layout';
import { AnonymousLayout } from '../layouts/anonymous.layout';
import { SignInPage } from '../pages/signin/signin.page';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: Paths.MAIN,
        element: <ProtectedLayout />,
        children: [],
      },
      {
        path: Paths.AUTH,
        element: <AnonymousLayout />,
        children: [
          {
            path: Paths.SIGN_IN,
            element: <SignInPage />,
          },
        ],
      },
    ],
  }
]);
