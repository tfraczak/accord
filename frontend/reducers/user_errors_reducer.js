import {
    RECEIVE_USERS,
    RECEIVE_USER_ERRORS,
    REMOVE_USER_ERRORS,
} from "../actions/user_actions";

export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER_ERRORS:
            return action.errors;
        case RECEIVE_USERS:
            return [];
        case REMOVE_USER_ERRORS:
            return [];
        default:
            return state;
    }
};