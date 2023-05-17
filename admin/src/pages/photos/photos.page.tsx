import styles from './photos.module.css'
import type { ChangeEvent, FC } from 'react';
import type { InferType } from 'yup';

import { useState, useRef, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { Button } from '../../ui-kit/button/button';
import { Input } from '../../ui-kit/input/input';
import { Modal } from '../../ui-kit/modal/modal';
import { Typography } from '../../ui-kit/typography/typography';
import { GalleryFragment } from '../../components/gallery-fragment/gallery-fragment';
import { useDeletePhotoMutation, useSavePhotoMutation, useUploadPhotoMutation } from '../../store/slices/api/gallery.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '../../store/hooks';
import { getPhotos } from '../../store/slices/gallery/gallery.selector';

const schema = object({
  title: string().trim().required('Название является обязательным'),
  url: string().trim().required('Выберите фото'),
});

export type TFormPhoto = InferType<typeof schema>;

export const PhotosPage: FC = () => {
  const [ isUploadModal, setUploadModal ] = useState<boolean>(false);
  const [ uploadedUrl, setUploadedUrl ] = useState<string | undefined>();
  const fileRef = useRef<null | HTMLInputElement>(null);

  const photos = useAppSelector(getPhotos);
  const [uploadPhoto] = useUploadPhotoMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [savePhoto] = useSavePhotoMutation();

  const additionalFragment = photos.length % 7 === 0 ? 1 : 0;
  const fragmentCounts = Math.ceil(photos.length / 7) + additionalFragment;

  const fragments = [];

  for (let i = 0; i < fragmentCounts; i++) {
    fragments.push(photos.slice(i * 7, (i * 7) + 7));
  }

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
          setUploadedUrl(data.url);
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
          setValue('url', '');
          resetField('url');
          setUploadedUrl(undefined);
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
        setValue('url', '');
        resetField('title');
        resetField('url');
        setUploadedUrl(undefined);
        setUploadModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const ComponentToRender = useCallback(
    () => {
      if (!uploadedUrl) {
        return (
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
        );
      } else {
        return (
          <img
            className={styles.preview}
            src={uploadedUrl}
            alt='preview'
          />
        );
      }
    },
    [uploadedUrl]
  );

  return (
    <>
      <section className={styles.section}>
        <Typography as='h1' CSSType='heading-1'>Галерея</Typography>
        {
          fragments.map((fragment, idx) => <GalleryFragment key={idx} photos={fragment} onAddButtonClick={onAddPhotoButtonClick} />
            )
        }
      </section>
      {
        isUploadModal &&
        <Modal
          title='Загрузить фото'
          closePopup={closeModalHandler}
        >
          {
            ComponentToRender()
          //   !getValues('url') &&
          //   <label
          //     className={styles.custom_file_upload}
          //   >
          //     <Typography as='span' CSSType='heading-3'>+</Typography>
          //     <input
          //       type='file'
          //       ref={fileRef}
          //       onChange={onUploadFormChange}
          //     />
          //   </label>
          // }
          // {
          //   getValues('url') &&
          //   <img
          //     className={styles.preview}
          //     src={getValues('url')}
          //     alt='preview'
          //   />
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
