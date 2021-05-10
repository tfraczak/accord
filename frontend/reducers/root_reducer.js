import entities from "../reducers/entities_reducer";
import session from "../reducers/session_reducer";
import errors from "../reducers/errors_reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    entities,
    session,
    errors,
});