import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';

import {
  IMAGE_SAVE,
  WALLPAPER_SETUP,
  RATE_SCREEN_REMOVE,
  RATE_SCREEN_TEMPORARY_HIDE,
} from '../../store/actionTypes';

const handlers = {
  [`${IMAGE_SAVE}_SUCCESS`]: state => ({
    ...state,
    temporaryHideRateScreen: false,
    userActionsCount: state.userActionsCount + 1,
  }),
  [`${WALLPAPER_SETUP}_SUCCESS`]: state => ({
    ...state,
    temporaryHideRateScreen: false,
    userActionsCount: state.userActionsCount + 1,
  }),
  [RATE_SCREEN_REMOVE]: state => ({
    ...state,
    neverShowRateScreen: true,
  }),
  [RATE_SCREEN_TEMPORARY_HIDE]: state => ({
    ...state,
    temporaryHideRateScreen: true,
  }),
};

export default injectReducer(initialState.misc, handlers);
