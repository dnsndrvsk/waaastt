import { PermissionsAndroid } from 'react-native';

import config from '../../config';

export default store => next => async action => {
  if (action.requestPermission) {
    const { requestPermission, ...rest } = action;

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      requestPermission,
    });

    if (requestPermission === 'storage') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: `${config.appName} storage permission`,
            message: `${config.appName} needs access to your storage so you can save your photos`,
          },
        );
        if (__DEV__) console.log(granted);
        if (granted === 'denied') {
          return next({
            ...rest,
            type: `${rest.type}_FAILURE`,
          });
        }
        return next({
          ...rest,
          type: `${rest.type}_SUCCESS`,
          payload: true,
        });
      } catch (error) {
        if (__DEV__) console.log(error);
        return next({
          ...rest,
          type: `${rest.type}_FAILURE`,
          error,
        });
      }
    }

    return next(action);
  } else {
    return next(action);
  }
};
