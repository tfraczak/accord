import session from "./session_errors_reducer";
import servers from "./server_errors_reducer";
import users from "./user_errors_reducer";
import { combineReducers } from 'redux';

export const REMOVE_ERRORS = "REMOVE_ERRORS";

export default combineReducers({
    servers,
    session,
    users,
});