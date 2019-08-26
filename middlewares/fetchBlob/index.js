import RNFetchBlob from 'react-native-fetch-blob';

import config from '../../config';

export default store => next => action => {
  if (action.fetchUrl) {
    const { fetchUrl, imageId, method, payload, ...rest } = action;
    // const state = store.getState();

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      fetchUrl,
      imageId,
      method,
      payload,
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    RNFetchBlob.fetch(
      method || 'GET',
      fetchUrl,
      {
        ...headers,
        ...action.headers,
      },
      [...payload],
    )
      .then(response => {
        if (response.respInfo.status >= 400) throw response;
        return next({
          ...rest,
          type: `${rest.type}_SUCCESS`,
          image: response.data,
          filename: `${config.appFilesPrefix}_${imageId}.jpg`,
          mimetype: 'jpg',
        });
      })
      .catch(error => {
        if (__DEV__) console.log(error);
        return next({
          ...rest,
          type: `${rest.type}_FAILURE`,
          errorMessage: error.error,
          error,
        });
      });
  } else if (action.image && action.filename && action.mimetype) {
    const { image, filename, mimetype, ...rest } = action;
    // const state = store.getState();

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
    });

    const downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    const imageLocation = `${downloadDir}/${filename}`;
    // save image
    RNFetchBlob.fs
      .writeFile(imageLocation, image, 'base64')
      .then(() => {
        // update gallery
        RNFetchBlob.fs
          .scanFile([{ path: imageLocation, mime: mimetype }])
          .then(() => {})
          .catch(() => {});

        return next({
          ...rest,
          type: `${rest.type}_SUCCESS`,
          payload: {},
        });
      })
      .catch(error => {
        if (__DEV__) console.log(error);
        return next({
          ...rest,
          type: `${rest.type}_FAILURE`,
          errorMessage: error.error,
          error,
        });
      });
  } else {
    return next(action);
  }
};
