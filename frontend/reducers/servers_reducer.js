import { bindActionCreators } from "redux";
import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_INVITATIONS,
    RECEIVE_INVITATION,
    REMOVE_INVITATION,
} from "../actions/server_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch(action.type) {
        case RECEIVE_SERVERS:
            return Object.assign({}, action.servers);
        case RECEIVE_SERVER:
            return Object.assign({}, state, { [action.server.id]: action.server });
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            delete nextState[action.serverId];
            return nextState;
        case RECEIVE_INVITATIONS:
            return Object.assign({}, state, { invitations: action.invitations });
        case RECEIVE_INVITATION:
            nextState = Object.assign({}, state);
            nextState["invitations"] = {...nextState["invitations"], ...{ [action.invitation.id]: action.invitation }}
            return nextState
        case REMOVE_INVITATION:
            nextState = Object.assign({}, state);
            delete nextState["invitations"][action.inviteId];
            return nextState
        default:
            return state;
    }
}