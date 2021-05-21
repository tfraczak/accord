import {
    RECEIVE_INVITATION,
    RECEIVE_INVITATIONS,
    REMOVE_INVITATION,
} from "../../actions/invitation_actions";
import {
    RECEIVE_SERVER_INFO,
    LEAVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_JOINED_SERVER,
} from "../../actions/server_actions";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let invitation, invitations, invitationId, invitationIds;
    switch (action.type) {
        case RECEIVE_INVITATIONS:
            return Object.assign({}, state, action.invitations);
        case RECEIVE_USER_LOAD_DATA:
            invitations = action.payload.invitations;
            return Object.assign({}, state, invitations);
        case RECEIVE_SERVER_INFO:
            invitations = action.payload.invitations;
            return Object.assign({}, state, invitations);
        case RECEIVE_JOINED_SERVER:
            invitations = action.payload.invitations;
            return Object.assign({}, state, invitations);
        case LEAVE_SERVER:
            nextState = Object.assign({}, state);
            invitationIds = Object.values(action.payload.invitationIds);
            for(let id of invitationIds) { delete nextState[id] }
            return nextState;
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            invitationIds = Object.values(action.payload.invitationIds);
            for(let id of invitationIds) { delete nextState[id] }
            return nextState;
        default:
            return state;
    }
};