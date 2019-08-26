import axios from 'axios';

import config from '../../config';

export default store => next => action => {
  if (action.url) {
    const { url, method, payload, ...rest } = action;
    // const state = store.getState();

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      url,
      method,
      payload,
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    axios({
      url: /^(https?:\/\/)/.test(url)
        ? url
        : `${config.cloudinary.domain}/${config.cloudinary.username}${url}`,
      method: method || 'GET',
      data: payload,
      headers: {
        ...headers,
        ...action.headers,
      },
    })
      .then(response => {
        // if (response.status >= 400) throw response.data;
        if (response.status >= 400) {
          return next({
            ...rest,
            type: `${rest.type}_FAILURE`,
            errorMessage: error.error,
            error,
          });
        }

        return next({
          ...rest,
          type: `${rest.type}_SUCCESS`,
          payload: response.data,
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
