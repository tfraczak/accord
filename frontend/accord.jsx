import React from 'react';
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import throttle from 'lodash.throttle';
import { saveState } from './utils/state_utils';


document.addEventListener("DOMContentLoaded", () => {

    // grabs the root element
    const root = document.getElementById("root");
    let store;
    // creates the store depending if there is a user currently signed in the data backend
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser },
            },
            session: {
                id: window.currentUser.id,
            },
        }
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

    window.getState = store.getState();
    window.dispatch = store.dispatch;

    // renders the entire DOM passing the store as a prop
    ReactDOM.render(<Root store={store} />, root);

});