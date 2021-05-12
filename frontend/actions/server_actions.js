import * as SessionAPIUtil from "../utils/session_utils";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";


const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser,
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
});

export const removeSessionErrors = () => ({
    type: REMOVE_SESSION_ERRORS,
});

export const register = user => dispatch => {
    SessionAPIUtil.createUser(user).then(user => {
        dispatch(receiveCurrentUser(user))
    }, err => {
        dispatch(receiveSessionErrors(err.responseJSON))
    })
};

export const login = user => dispatch => {
    SessionAPIUtil.login(user).then(user => {
        dispatch(receiveCurrentUser(user))
    }, err => {
        dispatch(receiveSessionErrors(err.responseJSON))
    })
};

export const logout = () => dispatch => {
    SessionAPIUtil.logout().then(() => {
        dispatch(logoutCurrentUser())
    }, err => {
        dispatch(receiveSessionErrors(err.responseJSON))
    })
};

