import * as SessionAPIUtil from "../utils/session_utils";
import { getUserServers } from "../utils/server_utils";
import { RECEIVE_SERVERS, receiveServers, receiveServerErrors } from "./server_actions";
import { convertToSnakeCase } from "../utils/func_utils";
import { receiveUsers } from './user_actions';
import { receiveMemberships } from './membership_actions';
import { receiveInvitations } from './invitation_actions';
import { receiveChannels } from './channel_actions';


export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"; 
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const REMOVE_SESSION_ERRORS = "REMOVE_SESSION_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const RECEIVE_USER_LOAD_DATA = "RECEIVE_USER_LOAD_DATA";


const receiveCurrentUser = currentUser => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser,
    }
};

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
});

const receiveUserLoadData = payload => {
    
    return {
        type: RECEIVE_USER_LOAD_DATA,
        payload,
    }
    
};

export const removeErrors = () => ({
    type: REMOVE_ERRORS,
});



export const register = user => dispatch => {
    user = convertToSnakeCase(user);
    return SessionAPIUtil.createUser(user).then(currentUser => (
        dispatch(receiveCurrentUser(currentUser))
    ), err => (
        dispatch(receiveSessionErrors(err.responseJSON))
    ))
};

export const login = user => dispatch => {
    user = convertToSnakeCase(user);
    SessionAPIUtil.login(user).then(currentUser => (
        dispatch(receiveCurrentUser(currentUser))
    ), err => (
        dispatch(receiveSessionErrors(err.responseJSON))
    ));
};

export const logout = () => dispatch => {
    SessionAPIUtil.logout().then(() => (
        dispatch(logoutCurrentUser())
    ), err => (
        dispatch(receiveSessionErrors(err.responseJSON))
    ));
};

export const _retrieveUserLoadData = (userId, history) => dispatch => {
    getUserServers(userId)
        .then(payload => {
            dispatch(receiveUserLoadData(payload));
        })
        .then(
            () => history.push("/channels/@me"), () => history.push("/")
        );
};