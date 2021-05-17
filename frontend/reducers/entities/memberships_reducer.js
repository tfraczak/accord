import {
    RECEIVE_MEMBERSHIP,
    RECEIVE_MEMBERSHIPS,
    REMOVE_MEMBERSHIP,
} from "../../actions/membership_actions";

import { REMOVE_SERVER } from '../../actions/server_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            return Object.assign({}, state, action.memberships );
        case RECEIVE_MEMBERSHIP:
            return Object.assign({}, state, { [action.membership.id]: action.membership });
        case REMOVE_MEMBERSHIP:
            nextState = Object.assign({}, state);
            debugger
            delete nextState[action.membershipId];
            
            return  nextState;
        default:
            return state;
    }
};