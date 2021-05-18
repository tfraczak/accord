import {
    RECEIVE_CURRENT_USER, 
    LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";

import {
    RECEIVE_INVITATION,
    REMOVE_INVITATION,
} from '../../actions/invitation_actions';

import { RECEIVE_INVITED_SERVER } from "../../actions/server_actions";


const _nullSession = Object.freeze({
    id: null,
});

export default (state = _nullSession, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.currentUser.id };
        case LOGOUT_CURRENT_USER:
            return _nullSession;
        case RECEIVE_INVITED_SERVER:
            return Object.assign({}, state, { invitedServer: action.server })
        case RECEIVE_INVITATION:
            return Object.assign({}, state, { invitation: action.invitation })
        case REMOVE_INVITATION:
            return Object.assign({}, state, { invitation: "" });
        default:
            return state;
    }
};