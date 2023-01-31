// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import configureStore from './store/store';
import Root from './components/root';
import { saveState } from './utils/state_utils';
import ActionCable from 'actioncable';

document.addEventListener('DOMContentLoaded', () => {
  window.App = {};
  // @ts-ignore
  window.App.cable = ActionCable.createConsumer();
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const currentUser = window.currentUser;
    const preloadedState = {
      entities: { users: { [window.currentUser.id]: window.currentUser } },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  store.subscribe(throttle(() => {
    saveState({
      entities: store.getState().entities,
      session: store.getState().session,
    });
  }, 1000));

  ReactDOM.render(<Root store={store} />, root);
});