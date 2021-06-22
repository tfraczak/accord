import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";
import { loadState } from '../utils/state_utils';

let middleware = [];

if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, thunk, logger];
} else {
    middleware = [...middleware, thunk];
}

const configureStore = (preloadedState = {}) => {
    const persistedState = loadState();
    const newState = Object.assign({}, preloadedState, persistedState);
    return createStore(rootReducer, newState, applyMiddleware(...middleware));
}

export default configureStore;