import {
    RECEIVE_MEMBERSHIP,
    RECEIVE_MEMBERSHIPS,
    REMOVE_MEMBERSHIP,
} from "../../actions/membership_actions";

import {
    REMOVE_SERVER,
    RECEIVE_JOINED_SERVER,
    RECEIVE_NEW_SERVER,
    RECEIVE_SERVER_INFO,
    LEAVE_SERVER,
    KICK_MEMBER,
} from '../../actions/server_actions';

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let membership, memberships, membershipId, membershipIds;
    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            return Object.assign({}, state, action.memberships);
        case RECEIVE_USER_LOAD_DATA:
            memberships = action.payload.memberships;
            return Object.assign({}, state, memberships);
        case RECEIVE_MEMBERSHIP:
            return Object.assign({}, state, { [action.membership.id]: action.membership });
        case LEAVE_SERVER:
            nextState = Object.assign({}, state);
            membershipIds = Object.values(action.payload.membershipIds);
            for(let id of membershipIds) { delete nextState[id] }
            return nextState;
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            membershipIds = Object.values(action.payload.membershipIds);
            for(let id of membershipIds) { delete nextState[id] }
            return nextState;
        case RECEIVE_JOINED_SERVER:
            memberships = action.payload.memberships;
            return Object.assign({}, state, memberships);
        case RECEIVE_NEW_SERVER:
            membership = action.payload.membership;
            return Object.assign({}, state, { [membership.id]: membership });
        case KICK_MEMBER:
            nextState = Object.assign({}, state);
            membership = action.payload.membership;
            delete nextState[membership.id];
            return nextState;
        case RECEIVE_SERVER_INFO:
            memberships = action.payload.memberships;
            return Object.assign({}, state, memberships);
        default:
            return state;
    }
};