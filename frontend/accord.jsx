import React from 'react';
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener("DOMContentLoaded", () => {

    // grabs the root element
    const root = document.getElementById("root");
    let store;
    // creates the store depending if there is a user currently signed in the data backend
    if (window.currentUser) {
        const { id, username, usernameId, avatarUrl } = window.currentUser;
        const preloadedState = {
            entities: {
                id: { id, username, usernameId, avatarUrl },
            },
            session: {
                currentUser: { ...window.currentUser },
            },
            errors: [],
        }
        store = configureStore(preloadedState);
    } else {
        store = configureStore();
    }

    // renders the entire DOM passing the store as a prop
    ReactDOM.render(<Root store={store} />, root);

});