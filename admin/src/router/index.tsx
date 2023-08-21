import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/root.layout';
import { loader as authLoader } from '../layouts/root.loader';
import { Paths } from './paths';
import { ProtectedLayout } from '../layouts/protected.layout';
import { AnonymousLayout } from '../layouts/anonymous.layout';
import { SignInPage } from '../pages/signin/signin.page';
import { PhotosPage } from '../pages/photos/photos.page';
import { loader as photosLoader } from '../pages/photos/photos.loader';
import { BlogPage } from '../pages/blog/blog.page';

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
            loader: photosLoader,
            element: <PhotosPage />
          },
          {
            path: Paths.BLOG,
            element: <BlogPage />,
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
