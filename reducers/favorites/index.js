import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';

import { FAVORITE_ADD, FAVORITE_REMOVE } from '../../store/actionTypes';

const handlers = {
  [FAVORITE_ADD]: (state, { payload }) => ({
    ...state,
    data: [payload, ...state.data],
  }),
  [FAVORITE_REMOVE]: (state, { payload }) => {
    const updated = [...state.data];
    const index = updated.map(x => x.public_id).indexOf(payload.public_id);
    updated.splice(index, 1);
    return { ...state, data: updated };
  },
};

export default injectReducer(initialState.favorites, handlers);
