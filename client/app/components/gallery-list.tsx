export const GalleryList = ({ data }: {
  data: {
    id: number;
    url: string;
    title: string;
  }[]
}) => {
  return (
    <ul className='gallery_list'>
      {
        data.map((photo, idx) => {
          return (
            <li key={photo.id} className={`gallery_img ${idx === 0 ? 'gallery_img__active' : ''}`}>
              <img src={photo.url} alt={photo.title} width={818} height={640} />
          </li>
          );
        })
      }
    </ul>
  );
}