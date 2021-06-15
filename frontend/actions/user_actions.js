import * as UserAPIUtil from "../utils/user_utils";
import { retrieveUserServers } from "./server_actions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_MEMBERS = "RECEIVE_MEMBERS";
export const RECEIVE_SERVER_USERS = "RECEIVE_SERVER_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const REMOVE_USER_ERRORS = "REMOVE_USER_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const RECEIVE_NEW_MEMBER = "RECEIVE_NEW_MEMBER";


export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users,
});

const receiveUser = user => ({
    type: RECEIVE_USER,
    user,
});

export const removeUser = userId => ({
    type: REMOVE_USER,
    userId,
});

const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors,
});

export const receiveNewMember = payload => ({
    type: RECEIVE_NEW_MEMBER,
    payload,
});

export const retrieveServerMembers = serverId => dispatch => {
    return UserAPIUtil.getServerMembers(serverId)
        .then(
            users => dispatch(receiveUsers(users)),
            err => dispatch(receiveUserErrors(err.responseJSON))
        );
};