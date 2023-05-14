import { createBrowserRouter } from 'react-router-dom';
import { RootLayout, loader as authLoader } from '../layouts/root.layout';
import { Paths } from './paths';
import { ProtectedLayout } from '../layouts/protected.layout';
import { AnonymousLayout } from '../layouts/anonymous.layout';
import { SignInPage } from '../pages/signin/signin.page';
import { PhotosPage } from '../pages/photos/photos.page';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: authLoader,
    children: [
      {
        path: Paths.MAIN,
        element: <ProtectedLayout />,
        children: [
          {
            path: Paths.PHOTOS,
            element: <PhotosPage />
          },
        ],
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
