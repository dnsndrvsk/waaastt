import firebase from 'react-native-firebase';

import { IMAGE_LIKE, IMAGE_DISLIKE, LIKES_GET } from '../../store/actionTypes';

export default store => next => action => {
  if (action.firebaseRef) {
    const { firebaseRef, image, ...rest } = action;

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      firebaseRef,
      image,
      payload: image,
    });

    const docRef = firebase.database().ref(firebaseRef);

    if (rest.type === IMAGE_LIKE) {
      docRef.once('value').then(doc => {
        if (doc.exists()) {
          const imageDoc = doc.val();
          imageDoc.likes = imageDoc.likes + 1;
          docRef
            .update(imageDoc)
            .then(data => {
              return next({
                ...rest,
                type: `${rest.type}_SUCCESS`,
                payload: imageDoc,
              });
            })
            .catch(error => {
              if (__DEV__) console.log(error);
              return next({
                ...rest,
                type: `${rest.type}_FAILURE`,
                errorMessage: null,
                error: null,
                payload: image,
              });
            });
        } else {
          const imageDoc = {
            public_id: image.public_id,
            format: image.format,
            likes: 1,
          };
          docRef
            .set(imageDoc)
            .then(data => {
              return next({
                ...rest,
                type: `${rest.type}_SUCCESS`,
                payload: imageDoc,
              });
            })
            .catch(error => {
              if (__DEV__) console.log(error);
              return next({
                ...rest,
                type: `${rest.type}_FAILURE`,
                errorMessage: null,
                error: null,
                payload: image,
              });
            });
        }
      });
    } else if (rest.type === IMAGE_DISLIKE) {
      docRef.once('value').then(doc => {
        if (doc.exists()) {
          const imageDoc = doc.val();
          imageDoc.likes = imageDoc.likes - 1;
          docRef
            .update(imageDoc)
            .then(data => {
              return next({
                ...rest,
                type: `${rest.type}_SUCCESS`,
                payload: imageDoc,
              });
            })
            .catch(error => {
              if (__DEV__) console.log(error);
              return next({
                ...rest,
                type: `${rest.type}_FAILURE`,
                errorMessage: null,
                error: null,
                payload: image,
              });
            });
        } else {
          return next({
            ...rest,
            type: `${rest.type}_FAILURE`,
            errorMessage: null,
            error: null,
            payload: image,
          });
        }
      });
    } else if (rest.type === LIKES_GET) {
      docRef
        .once('value')
        .then(doc => {
          if (doc.exists()) {
            let images = doc.val();
            return next({
              ...rest,
              type: `${rest.type}_SUCCESS`,
              payload: images,
            });
          } else {
            return next({
              ...rest,
              type: `${rest.type}_FAILURE`,
              errorMessage: null,
              error: null,
            });
          }
        })
        .catch(error => {
          if (__DEV__) console.log(error);
          return next({
            ...rest,
            type: `${rest.type}_FAILURE`,
            errorMessage: null,
            error: null,
          });
        });
    }

    // return next(action);
  } else {
    return next(action);
  }
};
