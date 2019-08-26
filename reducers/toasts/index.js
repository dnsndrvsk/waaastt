import initialState from '../../store/initialState';
import injectReducer from '../../store/injectReducer';
import { TOAST_ADD, TOAST_DELETE } from '../../store/actionTypes';

const handlers = {
  [TOAST_ADD]: (state, { payload }) => {
    payload.id = state.count;
    payload.time = Date.now() + payload.time;

    return {
      ...state,
      toasts: [payload, ...state.toasts],
      count: state.count + 1,
    };
  },
  [TOAST_DELETE]: (state, { payload }) => {
    if (!payload) {
      const toasts = [...state.toasts];
      toasts.pop();
      return { ...state, toasts };
    }

    return {
      ...state,
      toasts: state.toasts.filter(x => x.id !== payload),
    };
  },
};

export default injectReducer(initialState.toasts, handlers);
