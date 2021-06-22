import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_SERVER_ERRORS,
    REMOVE_SERVER_ERRORS,
} from "../../actions/server_actions";

import { REMOVE_ERRORS } from './errors_reducer';

import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

export default (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_SERVER_ERRORS:
            if (action.errors) return action.errors;
            return state;
        // case RECEIVE_SERVERS:
        //     return [];
        case RECEIVE_SERVER:
            return [];
        case REMOVE_SERVER:
            return [];
        case REMOVE_SERVER_ERRORS:
            return [];
        case REMOVE_ERRORS:
            return [];
        case LOGOUT_CURRENT_USER:
            return [];
        default:
            return state;
    }
};