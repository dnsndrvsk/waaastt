import { offlineActionTypes } from 'react-native-offline';

import {
  IMAGE_DOWNLOAD,
  IMAGE_SAVE,
  IMAGES_LOAD,
  WALLPAPER_SETUP,
  ACCESS_STORAGE,
} from '../../store/actionTypes';

import { saveImage, getImagesLikes, loadImages } from '../../actions/images';
import { addToast } from '../../actions/toasts';

export default store => next => action => {
  if (action.image && action.type === `${IMAGE_DOWNLOAD}_SUCCESS`) {
    const { image, filename, mimetype, ...rest } = action;
    store.dispatch(
      saveImage({
        image,
        filename,
        mimetype,
      }),
    );
  }

  if (action.type === offlineActionTypes.CONNECTION_CHANGE) {
    store.dispatch(loadImages({ tag: 'superhero' }));
  }

  if (action.type === `${IMAGES_LOAD}_SUCCESS`) {
    store.dispatch(getImagesLikes());
  }

  if (action.type === `${IMAGE_SAVE}_SUCCESS`) {
    store.dispatch(
      addToast({
        type: 'success',
        action: 'save',
      }),
    );
  }

  if (action.type === `${WALLPAPER_SETUP}_SUCCESS`) {
    store.dispatch(
      addToast({
        type: 'success',
        action: 'set',
      }),
    );
  }

  if (action.type === `${ACCESS_STORAGE}_FAILURE`) {
    store.dispatch(
      addToast({
        type: 'error',
        action: 'storage',
      }),
    );
  }

  return next(action);
};
