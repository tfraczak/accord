import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";
import { loadState } from '../utils/state_utils';


const configureStore = (preloadedState = {}) => {
    const persistedState = loadState();
    
    const newState = Object.assign({}, preloadedState, persistedState);
    return createStore(rootReducer, newState, applyMiddleware(thunk, logger));
}

export default configureStore;