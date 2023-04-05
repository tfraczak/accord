import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import createStore from './store/store';
import Root from './components/root';
import { saveState } from './utils/state_utils';
import ActionCable from 'actioncable';
import { DEFAULT_STATE } from '@constants';

document.addEventListener('DOMContentLoaded', () => {
  globalThis.App.cable = ActionCable.createConsumer();
  const root = document.getElementById('root');
  let store;
  const { currentUser } = globalThis;
  if (currentUser) {
    const preloadedState = {
      ...DEFAULT_STATE,
      session: { id: currentUser.id },
    };
    preloadedState.entities = {
      ...DEFAULT_STATE.entities,
      users: { [currentUser.id]: currentUser },
    };
    store = createStore(preloadedState);
    delete globalThis.currentUser;
  } else {
    store = createStore();
  }

  store.subscribe(throttle(() => {
    saveState({
      entities: store.getState().entities,
      session: store.getState().session,
    });
  }, 10000));

  ReactDOM.render(<Root store={store} />, root);
});