import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_SERVER_ERRORS,
} from "../../actions/server_actions";

import { REMOVE_ERRORS } from './errors_reducer';

export default (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_SERVER_ERRORS:
            
            return action.errors;
        case RECEIVE_SERVERS:
            return [];
        case RECEIVE_SERVER:
            return [];
        case REMOVE_SERVER:
            return [];
        case REMOVE_ERRORS:
            return [];
        default:
            return state;
    }
};