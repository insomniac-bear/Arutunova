import styles from './photos.module.css'
import type { ChangeEvent, FC, FormEvent, SyntheticEvent } from 'react';
import type { IPhoto } from '../../types/gallery.types';

import { useState, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Button } from '../../ui-kit/button/button';
import { Input } from '../../ui-kit/input/input';
import { Modal } from '../../ui-kit/modal/modal';
import { Typography } from '../../ui-kit/typography/typography';
import { GalleryFragment } from '../../components/gallery-fragment/gallery-fragment';
import { useUploadPhotoMutation } from '../../store/slices/api/gallery.api';

export const PhotosPage: FC = () => {
  const [ isUploadModal, setUploadModal ] = useState<boolean>(false);
  const fileRef = useRef<null | HTMLInputElement>(null);
  const photos = useLoaderData() as IPhoto[];
  const [uploadPhoto] = useUploadPhotoMutation();

  const onAddPhotoButtonClick = () => {
    setUploadModal(true);
  }

  const onUploadFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (fileRef.current !== null && fileRef.current.files !== null) {
      if (fileRef.current.files !== undefined)
      uploadPhoto(fileRef.current.files[0])
    }
  }

  return (
    <>
      <section className={styles.section}>
        <Typography as='h1' CSSType='heading-1'>Галерея</Typography>
        <GalleryFragment photos={photos} onAddButtonClick={onAddPhotoButtonClick} />
      </section>
      {
        isUploadModal &&
        <Modal
          title='Загрузить фото'
          closePopup={() => {setUploadModal(false)}}
        >
          <form>
            <label className={styles.custom_file_upload}>
              <Typography as='span' CSSType='heading-3'>+</Typography>
              <input
                type='file'
                ref={fileRef}
                onChange={onUploadFormChange}
              />
            </label>
          </form>
          <form className={styles.upload_form}>
            <Input labelName='Название' />
            <Input labelName='Описание' />
            <Button type='submit' CSSType='primary'>Сохранить</Button>
          </form>
        </Modal>
      }
    </>
  );
}
