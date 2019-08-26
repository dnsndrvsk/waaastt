import {
  IMAGES_LOAD,
  IMAGE_DOWNLOAD,
  IMAGE_SAVE,
  WALLPAPER_SETUP,
  LIKES_GET,
  IMAGE_LIKE,
  IMAGE_DISLIKE,
} from '../../store/actionTypes';

export const loadImages = ({ tag }) => ({
  type: IMAGES_LOAD,
  method: 'GET',
  url: `/image/list/${tag}.json`,
});

export const downloadImage = ({ url, imageId }) => ({
  type: IMAGE_DOWNLOAD,
  method: 'GET',
  fetchUrl: url,
  imageId,
  payload: [],
  headers: {},
});

export const saveImage = ({ image, filename, mimetype }) => ({
  type: IMAGE_SAVE,
  image,
  filename,
  mimetype,
});

export const setupWallpaper = wallpaper => ({
  type: WALLPAPER_SETUP,
  wallpaper,
});

export const preSetupWallpaper = () => ({
  type: `${WALLPAPER_SETUP}_REQUEST`,
});

export const likeImage = image => {
  const imageKey = image.public_id.split('/')[1];

  return {
    type: IMAGE_LIKE,
    firebaseRef: `images/${imageKey}`,
    image,
  };
};

export const dislikeImage = image => {
  const imageKey = image.public_id.split('/')[1];

  return {
    type: IMAGE_DISLIKE,
    firebaseRef: `images/${imageKey}`,
    image,
  };
};

export const getImagesLikes = () => ({
  type: LIKES_GET,
  firebaseRef: 'images/',
});
