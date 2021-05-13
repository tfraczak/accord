import users from "./users_reducer";
import servers from "./servers_reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    servers,
    users,
});