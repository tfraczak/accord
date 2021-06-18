import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOAD_DATA,
    RECEIVE_PRIVATE_USER_LOAD_DATA,
    LOGOUT_CURRENT_USER
} from "../../actions/session_actions";

import {
    RECEIVE_USERS,
    RECEIVE_USER,
    RECEIVE_NEW_MEMBER
} from "../../actions/user_actions";

import {
    RECEIVE_JOINED_SERVER,
    RECEIVE_SERVER_INFO,
    KICK_MEMBER,
    LOAD_MEMBERS
} from "../../actions/server_actions";

import { RECEIVE_CONVERSATION } from "../../actions/conversation_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let user, users;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_USERS:
            return Object.assign({}, state, action.users);
        case LOAD_MEMBERS:
            users = action.payload.users;
            nextState = Object.assign({}, state);
            for (let user of users) { nextState[user.id] = user }
            return nextState;
        case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, state, action.payload.users);
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
        case RECEIVE_NEW_MEMBER:
            user = action.payload.member;
            return Object.assign({}, state, { [user.id]: user });
        case RECEIVE_JOINED_SERVER:
            users = action.payload.users;
            return Object.assign({}, state, users);
        case RECEIVE_SERVER_INFO:
            user = action.payload.users;
            return Object.assign({}, state, users);
        case KICK_MEMBER:
            nextState = Object.assign({}, state);
            delete nextState[action.payload.member.id];
            return nextState;
        case RECEIVE_PRIVATE_USER_LOAD_DATA:
            return Object.assign({}, state, action.payload.members);
        case RECEIVE_CONVERSATION:
            return Object.assign({}, state, action.payload.members);
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};