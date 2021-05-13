import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
} from "../actions/server_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SERVERS:
            return Object.assign({}, action.servers);
        case RECEIVE_SERVER:
            return Object.assign({}, state, { [action.server.id]: action.server });
        case REMOVE_SERVER:
            let nextState = Object.assign({}, state);
            delete nextState[action.serverId];
            return nextState;
        default:
            return state;
    }
}