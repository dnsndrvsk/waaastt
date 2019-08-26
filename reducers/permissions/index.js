import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';

import { ACCESS_STORAGE } from '../../store/actionTypes';

const handlers = {
  [`${ACCESS_STORAGE}_SUCCESS`]: (state, { payload }) => ({
    ...state,
    storage: payload,
  }),
  [`${ACCESS_STORAGE}_FAILURE`]: state => ({
    ...state,
    storage: false,
  }),
};

export default injectReducer(initialState.permissions, handlers);
