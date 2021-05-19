import {
    RECEIVE_INVITATION,
    RECEIVE_INVITATIONS,
    REMOVE_INVITATION,
} from "../../actions/server_actions";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_INVITATIONS:
            return Object.assign({}, state, action.invitations );
            case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, state, action.payload.invitations );
        default:
            return state;
    }
};