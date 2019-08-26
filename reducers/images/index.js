import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';

import { IMAGES_LOAD } from '../../store/actionTypes';

const handlers = {
  [`${IMAGES_LOAD}_REQUEST`]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [`${IMAGES_LOAD}_SUCCESS`]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: payload.resources,
  }),
  [`${IMAGES_LOAD}_FAILURE`]: (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }),
};

export default injectReducer(initialState.images, handlers);
