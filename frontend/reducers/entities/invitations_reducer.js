import {
    RECEIVE_INVITATION,
    RECEIVE_INVITATIONS,
    REMOVE_INVITATION,
} from "../../actions/server_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_INVITATIONS:
            return Object.assign({}, state, action.invitations );
        case RECEIVE_INVITATION:
            return Object.assign({}, state, { [action.invitation.server_id]: action.invitation });
        case REMOVE_INVITATION:
            nextState = Object.assign({}, state);
            delete nextState[action.invitation.serverId][action.invitation.id];
            return  nextState;
        default:
            return state;
    }
};