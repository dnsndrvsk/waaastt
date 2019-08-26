import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import axios from './axios';
import fetchBlob from './fetchBlob';
import wallpaperManager from './wallpaperManager';
import firebase from './firebase';
import permissions from './permissions';

import dispatchActions from './dispatchActions';

const middlewareList = [axios, fetchBlob, wallpaperManager, firebase, permissions, dispatchActions];

if (__DEV__) middlewareList.push(createLogger({ collapsed: true }));

export default applyMiddleware(...middlewareList, thunk);
