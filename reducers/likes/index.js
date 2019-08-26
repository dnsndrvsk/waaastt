import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';

import { LIKES_GET, IMAGE_LIKE, IMAGE_DISLIKE } from '../../store/actionTypes';

const handlers = {
  [`${LIKES_GET}_REQUEST`]: state => ({
    ...state,
    busy: true,
    updating: true,
  }),
  [`${LIKES_GET}_SUCCESS`]: (state, { payload }) => {
    const likes = [];
    for (p in payload) likes.push(payload[p]);
    return {
      ...state,
      all: likes,
      busy: false,
      updating: false,
    };
  },
  [`${LIKES_GET}_FAILURE`]: state => ({
    ...state,
    busy: false,
    updating: false,
  }),
  [`${IMAGE_LIKE}_REQUEST`]: (state, { payload }) => {
    if (payload) {
      let reqImage = state.all.filter(x => x.public_id === payload.public_id)[0];
      if (reqImage) {
        reqImage.likes = reqImage.likes + 1;
      } else {
        reqImage = payload;
        reqImage.likes = 1;
      }
      return {
        ...state,
        user: [payload, ...state.user],
        all: [reqImage, ...state.all],
        busy: true,
      };
    }
    return { ...state, busy: true };
  },
  [`${IMAGE_LIKE}_SUCCESS`]: state => ({
    ...state,
    busy: false,
  }),
  [`${IMAGE_LIKE}_FAILURE`]: (state, { payload }) => {
    if (payload) {
      const user = [...state.user];
      const userIndex = user.map(x => x.public_id).indexOf(payload.public_id);
      user.splice(userIndex, 1);
      const all = [...state.all];
      const allIndex = all.map(x => x.public_id).indexOf(payload.public_id);
      user.splice(allIndex, 1);
      return { ...state, all, user, busy: false };
    }

    return { ...state };
  },
  [`${IMAGE_DISLIKE}_REQUEST`]: (state, { payload }) => {
    if (payload) {
      const user = [...state.user];
      const userIndex = user.map(x => x.public_id).indexOf(payload.public_id);
      user.splice(userIndex, 1);
      const all = [...state.all];
      const allIndex = all.map(x => x.public_id).indexOf(payload.public_id);
      all[allIndex].likes = all[allIndex].likes - 1;
      return { ...state, all, user, busy: true };
    }

    return { ...state };
  },
  [`${IMAGE_DISLIKE}_SUCCESS`]: state => ({
    ...state,
    busy: false,
  }),
  [`${IMAGE_DISLIKE}_FAILURE`]: (state, { payload }) => {
    return payload
      ? {
          ...state,
          user: [payload, ...state.user],
          all: [payload, ...state.all],
          busy: false,
        }
      : { ...state, busy: false };
  },
};

export default injectReducer(initialState.likes, handlers);
