import * as SessionAPIUtil from "../utils/session_utils";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"; 
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = currenUser => ({
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