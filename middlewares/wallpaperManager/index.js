import WallPaperManager from 'react-native-wallpaper-manager';

export default store => next => action => {
  if (action.wallpaper) {
    const { wallpaper, ...rest } = action;

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      wallpaper,
    });

    WallPaperManager.setWallpaper({ uri: wallpaper }, response => {
      if (response.status !== 'success') {
        if (__DEV__) console.log(response);
        return next({
          ...rest,
          type: `${rest.type}_FAILURE`,
          errorMessage: null,
          error: null,
        });
      }

      return next({
        ...rest,
        type: `${rest.type}_SUCCESS`,
        payload: {},
      });
    });
  } else {
    return next(action);
  }
};
