import { TOAST_ADD, TOAST_DELETE } from '../../store/actionTypes';

export const addToast = ({ type, action, time }) => ({
  type: TOAST_ADD,
  payload: {
    type: type || 'info',
    action,
    time: time || 3000,
  },
});

export const deleteToast = id => ({
  type: TOAST_DELETE,
  payload: id,
});
