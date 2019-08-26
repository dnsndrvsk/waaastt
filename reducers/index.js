import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

import images from './images';
import favorites from './favorites';
import likes from './likes';
import tasks from './tasks';
import toasts from './toasts';
import misc from './misc';
import permissions from './permissions';

export default combineReducers({
  images,
  favorites,
  likes,
  tasks,
  network,
  toasts,
  misc,
  permissions,
});
