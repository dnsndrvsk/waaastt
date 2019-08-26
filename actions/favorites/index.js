import { FAVORITE_ADD, FAVORITE_REMOVE } from '../../store/actionTypes';

export const addFavorite = image => ({
  type: FAVORITE_ADD,
  payload: image,
});

export const removeFavorite = image => ({
  type: FAVORITE_REMOVE,
  payload: image,
});
