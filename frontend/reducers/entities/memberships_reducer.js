import {
    RECEIVE_MEMBERSHIP,
    RECEIVE_MEMBERSHIPS,
    REMOVE_MEMBERSHIP,
} from "../../actions/membership_actions";

import {
    REMOVE_SERVER,
    RECEIVE_JOINED_SERVER,
    RECEIVE_NEW_SERVER,
} from '../../actions/server_actions';

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let membership;
    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            return Object.assign({}, state, action.memberships );
        case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, state, action.payload.memberships );
        case RECEIVE_MEMBERSHIP:
            return Object.assign({}, state, { [action.membership.id]: action.membership });
        case "LEAVE_SERVER":
            nextState = Object.assign({}, state);
            delete nextState[action.payload.membershipId];
            return  nextState;
        case RECEIVE_JOINED_SERVER:
            membership = action.payload.membership;
            return Object.assign({}, state, { [membership.id]: membership });
        case RECEIVE_NEW_SERVER:
            membership = action.payload.membership;
            return Object.assign({}, state, { [membership.id]: membership });
        default:
            return state;
    }
};