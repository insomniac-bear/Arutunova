import type { LoaderArgs, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import stylesUrl from '~/styles/gallery.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
];

export const loader = async ({ params }: LoaderArgs) => {
  const res = await fetch(`http://localhost:8000/photos/${params.galleryId}`);
  const data: {
    id: number;
    url: string;
    title: string;
  } = await res.json();

  return json({ data });
};

export default function GalleryRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Link
      to='/gallery'
      className='modal'
    >
      <img
        className='photo'
        src={data.url}
        alt={data.title}
      />
    </Link>
  );
}
