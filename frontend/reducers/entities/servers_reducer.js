import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_INVITATIONS,
    RECEIVE_INVITATION,
    REMOVE_INVITATION,
    RECEIVE_JOINED_SERVER,
    RECEIVE_NEW_SERVER,
} from "../../actions/server_actions";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let server;
    switch(action.type) {
        case RECEIVE_SERVERS:
            return Object.assign({}, action.servers);
        case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, action.payload.servers);
        case RECEIVE_SERVER:
            return Object.assign({}, state, { [action.server.id]: action.server });
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            delete nextState[action.serverId];
            return nextState;
        case "LEAVE_SERVER":
            nextState = Object.assign({}, state);
            delete nextState[action.payload.serverId];
            return nextState;
        case RECEIVE_JOINED_SERVER:
            server = action.payload.server;
            return Object.assign({}, state, { [server.id]: server });
        case RECEIVE_NEW_SERVER:
            server = action.payload.server;
            return Object.assign({}, state, { [server.id]: server });
        default:
            return state;
    }
}