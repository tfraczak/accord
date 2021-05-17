import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../../actions/user_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_USERS:
            return Object.assign({}, state, action.users);
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
        default:
            return state;
    }
};