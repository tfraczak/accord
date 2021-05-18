import {
    RECEIVE_SERVERS,
    RECEIVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_INVITATIONS,
    RECEIVE_INVITATION,
    REMOVE_INVITATION,
} from "../../actions/server_actions";


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
        case "LEAVE_SERVER":
            nextState = Object.assign({}, state);
            delete nextState[action.payload.serverId];
            return nextState;
        
        
        default:
            return state;
    }
}