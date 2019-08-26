import { RATE_SCREEN_REMOVE, RATE_SCREEN_TEMPORARY_HIDE } from '../../store/actionTypes';

export const removeRateScreen = () => ({
  type: RATE_SCREEN_REMOVE,
  payload: {},
});

export const temporaryHideRateScreen = () => ({
  type: RATE_SCREEN_TEMPORARY_HIDE,
  payload: {},
});
