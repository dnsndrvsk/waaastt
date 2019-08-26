import { ACCESS_STORAGE } from '../../store/actionTypes';

export const accessStorage = () => ({
  type: ACCESS_STORAGE,
  requestPermission: 'storage',
});
