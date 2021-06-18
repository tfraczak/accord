import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
    LEAVE_SERVER,
    RECEIVE_JOINED_SERVER,
    RECEIVE_NEW_SERVER,
    RECEIVE_SERVER_INFO,
} from "../../actions/server_actions";

import {
    RECEIVE_USER_LOAD_DATA,
    LOGOUT_CURRENT_USER
} from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let server, servers, serverId, serverIds;
    switch(action.type) {
        case RECEIVE_SERVERS:
            return Object.assign({}, action.servers);
        case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, action.payload.servers);
        case RECEIVE_SERVER:
            return Object.assign({}, state, { [action.server.id]: action.server });
        case RECEIVE_SERVER_INFO:
            return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            delete nextState[action.payload.serverId];
            return nextState;
        case LEAVE_SERVER:
            nextState = Object.assign({}, state);
            delete nextState[action.payload.serverId];
            return nextState;
        case RECEIVE_JOINED_SERVER:
            server = action.payload.server;
            return Object.assign({}, state, { [server.id]: server });
        case RECEIVE_NEW_SERVER:
            server = action.payload.server;
            return Object.assign({}, state, { [server.id]: server });
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}