import * as ServerAPIUtil from "../utils/server_utils";
import { removeUser } from "./user_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";
export const REMOVE_SERVER_ERRORS = "REMOVE_SERVER_ERRORS";
export const REMOVE_SERVER = "REMOVE_SERVER";


const receiveServers = servers => ({
    type: RECEIVE_SERVERS,
    servers,
});

const receiveServer = server => ({
    type: RECEIVE_SERVER,
    server,
});

const receiveServerErrors = errors => ({
    type: RECEIVE_SERVER_ERRORS,
    errors,
});

const removeServer = serverId => ({
    type: REMOVE_SERVER,
    serverId,
});

export const removeServerErrors = () => ({
    type: REMOVE_SERVER_ERRORS,
});

export const retrieveUserServers = userId => dispatch => {
    ServerAPIUtil.getUserServers(userId).then(servers => {
        dispatch(receiveServers(servers))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    })
};

export const createServer = server => dispatch => {
    ServerAPIUtil.createServer(server).then(server => {
        dispatch(receiveServer(server))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    })
};

export const updateServer = server => dispatch => {
    ServerAPIUtil.updateServer(server).then(server => {
        dispatch(receiveServer(server))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    })
};

export const deleteServer = serverId => dispatch => {
    ServerAPIUtil.destroyServer(serverId).then(server => {
        dispatch(removeServer(server.id))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    });
};

export const joinServer = (serverId, currentUserId) => dispatch => {
    const membership = {
        user_id: currentUserId,
        joinable_id: serverId,
        joinable_type: "Server",
    };
    ServerAPIUtil.joinServer(membership).then(server => {
        dispatch(receiveServer(server))
    }, () => (
        dispatch({
            type: RECEIVE_SERVER_ERRORS,
            errors: ["Something went wrong. Couldn't join server."],
        })
    ));
};

export const leaveServer = (membershipId, currentUserId, userId=null) => dispatch => {
    userId = userId || currentUserId;
    ServerAPIUtil.leaveServer(membershipId).then( membership => {
        if (currentUserId === userId) {
            dispatch(removeServer(membership.joinableId));
        } else {
            dispatch(removeUser(membership.userId));
        }       
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    });
};
