import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../../actions/user_actions";
import { RECEIVE_JOINED_SERVER } from "../../actions/server_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    let users;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_USERS:
            return Object.assign({}, state, action.users);
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
        case RECEIVE_JOINED_SERVER:
            users = action.payload.users;
            return Object.assign({}, state, users);
        default:
            return state;
    }
};