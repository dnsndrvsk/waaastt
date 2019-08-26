import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';

import { IMAGE_DOWNLOAD, IMAGE_SAVE, WALLPAPER_SETUP } from '../../store/actionTypes';

const handlers = {
  [`${IMAGE_DOWNLOAD}_REQUEST`]: state => ({
    ...state,
    downloadingImage: true,
  }),
  [`${IMAGE_DOWNLOAD}_SUCCESS`]: state => ({
    ...state,
    downloadingImage: false,
  }),
  [`${IMAGE_DOWNLOAD}_FAILURE`]: state => ({
    ...state,
    downloadingImage: false,
  }),

  [`${IMAGE_SAVE}_REQUEST`]: state => ({
    ...state,
    savingImage: true,
    downloadingImage: false,
  }),
  [`${IMAGE_SAVE}_SUCCESS`]: state => ({
    ...state,
    savingImage: false,
  }),
  [`${IMAGE_SAVE}_FAILURE`]: state => ({
    ...state,
    savingImage: false,
  }),

  [`${WALLPAPER_SETUP}_REQUEST`]: state => ({
    ...state,
    settingUpWallpaper: true,
  }),
  [`${WALLPAPER_SETUP}_SUCCESS`]: state => ({
    ...state,
    settingUpWallpaper: false,
  }),
  [`${WALLPAPER_SETUP}_FAILURE`]: state => ({
    ...state,
    settingUpWallpaper: false,
  }),
};

export default injectReducer(initialState.tasks, handlers);
