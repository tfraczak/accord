import {
    RECEIVE_USERS,
    RECEIVE_USER_ERRORS,
    REMOVE_USER_ERRORS,
} from "../../actions/user_actions";

import { REMOVE_ERRORS } from './errors_reducer';

export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER_ERRORS:
            return action.errors;
        case RECEIVE_USERS:
            return [];
        case REMOVE_ERRORS:
            return [];
        default:
            return state;
    }
};