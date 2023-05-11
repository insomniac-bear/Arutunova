import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/root.layout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [],
  }
]);
