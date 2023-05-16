import styles from './photos.module.css'
import type { ChangeEvent, FC } from 'react';
import type { InferType } from 'yup';
import type { IPhoto } from '../../types/gallery.types';

import { useState, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { Button } from '../../ui-kit/button/button';
import { Input } from '../../ui-kit/input/input';
import { Modal } from '../../ui-kit/modal/modal';
import { Typography } from '../../ui-kit/typography/typography';
import { GalleryFragment } from '../../components/gallery-fragment/gallery-fragment';
import { useDeletePhotoMutation, useSavePhotoMutation, useUploadPhotoMutation } from '../../store/slices/api/gallery.api';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object({
  title: string().trim().required('Название является обязательным'),
  url: string().trim().required('Выберите фото'),
});

export type TFormPhoto = InferType<typeof schema>;

export const PhotosPage: FC = () => {
  const [ isUploadModal, setUploadModal ] = useState<boolean>(false);
  const fileRef = useRef<null | HTMLInputElement>(null);

  const photos = useLoaderData() as IPhoto[];
  const [uploadPhoto] = useUploadPhotoMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [savePhoto] = useSavePhotoMutation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useForm<TFormPhoto>({
    resolver: yupResolver(schema),
  });

  const onAddPhotoButtonClick = () => {
    setUploadModal(true);
  }

  const onUploadFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (fileRef.current !== null && fileRef.current.files !== null) {
      if (fileRef.current.files !== undefined)
      uploadPhoto(fileRef.current.files[0])
        .unwrap()
        .then((data) => {
          setValue('url', data.url);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const closeModalHandler = () => {
    const url = getValues('url');
    if (url !== undefined && url !== '') {
      deletePhoto(url)
        .unwrap()
        .then(() => {
          resetField('url');
          setUploadModal(false);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setUploadModal(false);
    }
  }

  const formHandler: SubmitHandler<TFormPhoto> = (data) => {
    console.log(data);
    savePhoto(data)
      .unwrap()
      .then(() => {
        resetField('title');
        resetField('url');
        setUploadModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
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
          closePopup={closeModalHandler}
        >
          {
            !getValues('url') &&
            <label
              className={styles.custom_file_upload}
            >
              <Typography as='span' CSSType='heading-3'>+</Typography>
              <input
                type='file'
                ref={fileRef}
                onChange={onUploadFormChange}
              />
            </label>
          }
          {
            getValues('url') &&
            <img
              className={styles.preview}
              src={getValues('url')}
              alt='preview'
            />
          }
          <form className={styles.upload_form} onSubmit={handleSubmit(formHandler)}>
            <Input labelName='Название' type='text' {...register('title')} error={errors.title?.message} />
            <Button type='submit' CSSType='primary'>Сохранить</Button>
          </form>
        </Modal>
      }
    </>
  );
}
