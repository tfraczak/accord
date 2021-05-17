import * as ServerAPIUtil from "../utils/server_utils";
import { removeUser } from "./user_actions";
import { convertToSnakeCase } from "../utils/func_utils";
import { receiveInvitations } from './invitation_actions';
import * as MembershipActions from './membership_actions';
import { join } from "lodash";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";
export const REMOVE_SERVER_ERRORS = "REMOVE_SERVER_ERRORS";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const RECEIVE_INVITED_SERVER = "RECEIVE_INVITED_SERVER";
export const RECEIVE_LOCAL_USERNAME = "RECEIVE_LOCAL_USERNAME";




export const receiveServers = servers => ({
    type: RECEIVE_SERVERS,
    servers,
});

const receiveServer = server => ({
    type: RECEIVE_SERVER,
    server,
});

export const receiveServerErrors = errors => ({
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

const receiveInvitedServer = server => ({
    type: RECEIVE_INVITED_SERVER,
    server,
});

const receiveLocalUsername = membership => ({
    type: RECEIVE_LOCAL_USERNAME,
    membership,
});

export const retrieveUserServers = userId => dispatch => (
    ServerAPIUtil.getUserServers(userId).then(servers => (
        dispatch(receiveServers(servers))
    ), err => (
        dispatch(receiveServerErrors(err.responseJSON))
    ))
);

export const createServer = server => dispatch => {
    server = convertToSnakeCase(server);
    return ServerAPIUtil.createServer(server).then(server => {
        dispatch(receiveServer(server))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    });
};

export const updateServer = server => dispatch => {
    server = convertToSnakeCase(server);
    ServerAPIUtil.updateServer(server).then(server => {
        dispatch(receiveServer(server))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    })
};

export const deleteServer = serverId => dispatch => {
    return ServerAPIUtil.destroyServer(serverId).then(server => {
        dispatch(removeServer(server.id))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    });
};

export const joinServer = (membership) => dispatch => {
    membership = convertToSnakeCase(membership);
    
    return ServerAPIUtil.joinServer(membership).then(payload => {
        dispatch(receiveServer(payload.server));
        dispatch(MembershipActions.receiveMembership(payload.membership));
    }, () => (
        dispatch({
            type: RECEIVE_SERVER_ERRORS,
            errors: ["Something went wrong. Couldn't join server."],
        })
    ));
};

export const leaveServer = (membershipId) => dispatch => {
    debugger
    return ServerAPIUtil.leaveServer(membershipId).then( membership => {
        
        dispatch(removeServer(membership.joinableId));
        dispatch(MembershipActions.removeMembership(membership.id));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    })
};

export const retrieveServerInvitations = serverId => dispatch => {
    ServerAPIUtil.getInvitations(serverId).then(invitations => {
        dispatch(receiveInvitations(invitations));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};

export const getServerByJoinForm = (urlToken,currentUserId)  => dispatch => {
    return ServerAPIUtil.getServerByInvite(urlToken)
        .then(server => {
            
            let membership = {
                userId: currentUserId,
                joinableId: server.id,
                joinableType: "Server",
            };
            joinServer(membership)(dispatch);
        }, err => {
            dispatch(receiveServerErrors(err.responseJSON))
        });
};


export const getServerByUrl = urlToken => dispatch => (
    ServerAPIUtil.getServerByInvite(urlToken).then(server => (
        dispatch(receiveInvitedServer(server))
    ))  
);

// export const changeNickname = (membershipId, localUsername) => dispatch => {
//     const membership = {
//         id: membershipId,
//         localUsername: localUsername,
//     };
//     return ServerAPIUtil.updateLocalUsername(membership)
//         .then(membership => {
//             dispatch(receiveLocalUsername(membership));
//         });
// };

// window.changeNickname = changeNickname;