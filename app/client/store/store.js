import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/root_reducer';
import { loadState } from '../utils/state_utils';
import { DEFAULT_STATE } from '@constants';

const middleware = (getDefaultMiddleware) => {
  const middlewareToApply = [thunk];
  if (process.env.NODE_ENV === 'development') middlewareToApply.push(logger);
  return getDefaultMiddleware().concat(middlewareToApply);
};

const createStore = (state = DEFAULT_STATE) => {
  // @ts-ignore
  const persistedState = window.currentUser ? loadState() : {};
  const preloadedState = Object.assign({}, state, persistedState);
  const storeConfig = {
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware,
    preloadedState,
  };
  return configureStore(storeConfig);
};

export default createStore;