import store from "../../store";
import { galleryApi } from "../../store/slices/api/gallery.api";
import { setCookie } from "../../util/cookie";

export const loader = async () => {
  return await store
    .dispatch(
      galleryApi
        .endpoints
        .getPhotos
        .initiate(undefined)
    )
    .unwrap()
    .catch((err) => {
      if (err.status === 401) {
        setCookie('token', '');
      }
    });
}
