import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { GalleryFragment } from '~/components/gallery-fragment/gallery-fragment';

import stylesUrl from '~/styles/gallery.css';
import typographyStylesUrl from '~/styles/typography.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
  { rel: 'stylesheet', href: typographyStylesUrl },
];

export const loader = async () => {
  const res = await fetch('http://localhost:8000/photos');
  const data: {
    id: number;
    url: string;
    title: string;
  }[] = await res.json();

  return json({ data });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  const additionalFragment = data.length % 7 === 0 ? 1 : 0;
  const fragmentCounts = Math.ceil(data.length / 7) + additionalFragment;

  const fragments = [];

  for (let i = 0; i < fragmentCounts; i++) {
    fragments.push(data.slice(i * 7, (i * 7) + 7));
  }

  return (
    <main className='main'>
      <section className='intro'>
        <h1 className='heading-1 title'>Галерея</h1>
      </section>
      <section className='gallery' aria-label='Галерея работ'>
        {
          fragments.map(
            (fragment, idx) => <GalleryFragment key={idx} photos={fragment} />
          )
        }
      </section>
      <Outlet />
    </main>
  );
}
