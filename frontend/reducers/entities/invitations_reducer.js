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
        default:
            return state;
    }
};