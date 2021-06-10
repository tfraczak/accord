import * as ServerAPIUtil from "../utils/server_utils";
<<<<<<< HEAD
import { removeUser } from "./user_actions";
import { convertToSnakeCase } from "../utils/func_utils";
import { receiveInvitations } from './invitation_actions';
import * as MembershipActions from './membership_actions';
import { join } from "lodash";
=======
import { convertToSnakeCase } from "../utils/func_utils";
>>>>>>> main

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";
export const REMOVE_SERVER_ERRORS = "REMOVE_SERVER_ERRORS";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const RECEIVE_INVITED_SERVER = "RECEIVE_INVITED_SERVER";
export const RECEIVE_LOCAL_USERNAME = "RECEIVE_LOCAL_USERNAME";
<<<<<<< HEAD



=======
export const RECEIVE_NEW_SERVER = "RECEIVE_NEW_SERVER";
export const RECEIVE_JOINED_SERVER = "RECEIVE_JOINED_SERVER";
export const LEAVE_SERVER = "LEAVE_SERVER";
export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const RECEIVE_SERVER_INFO = "RECEIVE_SERVER_INFO";
>>>>>>> main

export const receiveServers = servers => ({
    type: RECEIVE_SERVERS,
    servers,
});

const receiveServer = server => ({
    type: RECEIVE_SERVER,
    server,
});

<<<<<<< HEAD
export const receiveServerErrors = errors => ({
    type: RECEIVE_SERVER_ERRORS,
    errors,
});

const removeServer = serverId => ({
    type: REMOVE_SERVER,
    serverId,
=======
export const receiveServerErrors = errors => {
    return {
        type: RECEIVE_SERVER_ERRORS,
        errors,
    };
};

const removeServer = payload => ({
    type: REMOVE_SERVER,
    payload,
>>>>>>> main
});

export const removeServerErrors = () => ({
    type: REMOVE_SERVER_ERRORS,
});

const receiveInvitedServer = server => ({
    type: RECEIVE_INVITED_SERVER,
    server,
});

<<<<<<< HEAD
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
=======
const receiveNewServer = payload => ({
    type: RECEIVE_NEW_SERVER,
    payload,
});

const receiveJoinedServer = payload => {
    
    return {
        type: RECEIVE_JOINED_SERVER,
        payload,
    }
};

const receiveServerInfo = payload => ({
    type: RECEIVE_SERVER_INFO,
    payload,
});

const leftServer = payload => ({
    type: LEAVE_SERVER,
    payload,
});

export const retrieveUserServers = userId => dispatch => (
    ServerAPIUtil.getUserServers(userId).then(servers => {
        dispatch(receiveServers(servers))
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON))
    })
);

export const retrieveServerInfo = serverId => dispatch => (
    ServerAPIUtil.getServer(serverId).then(
        payload => dispatch(receiveServerInfo(payload)),
        err => dispatch(receiveServerErrors(err.responseJSON))
    )
);

export const createServer = server => dispatch => {
    // server = convertToSnakeCase(server);
    return ServerAPIUtil.createServer(server)
        .then(
            payload => dispatch(receiveNewServer(payload)),
            err => dispatch(receiveServerErrors(err.responseJSON))
        );
};

export const updateServer = (server, serverId) => dispatch => {
    return ServerAPIUtil.updateServer(server, serverId).then(
        server => dispatch(receiveServer(server)),
        err => dispatch(receiveServerErrors(err.responseJSON))
    );
};

export const deleteServer = (serverId) => dispatch => {
    return ServerAPIUtil.destroyServer(serverId).then(
        payload => dispatch(removeServer(payload)),
        err => dispatch(receiveServerErrors(err.responseJSON))
    )
>>>>>>> main
};

export const joinServer = (membership) => dispatch => {
    membership = convertToSnakeCase(membership);
<<<<<<< HEAD
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

window.joinServer = joinServer;

export const leaveServer = (membershipId, currentUserId, userId=null) => dispatch => {
    userId = userId || currentUserId;
    return ServerAPIUtil.leaveServer(membershipId).then( membership => {
        if (currentUserId === userId) {
            dispatch(removeServer(membership.joinableId));
        } else {
            dispatch(removeUser(membership.userId));
        }       
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};

export const retrieveServerInvitations = serverId => dispatch => {
    ServerAPIUtil.getInvitations(serverId).then(invitations => {
        dispatch(receiveInvitations(invitations));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};

export const getServerByJoinForm = urlToken => dispatch => (
    ServerAPIUtil.getServerByInvite(urlToken).then(server => (
        dispatch(receiveServer(server))
    ), err => (
        dispatch(receiveServerErrors(err.responseJSON))
    ))
);

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
=======
    
    return ServerAPIUtil.joinServer(membership)
        .then(
            payload => dispatch(receiveJoinedServer(payload)),
            err => err
        );
};

export const leaveServer = (membershipId) => dispatch => {
    return ServerAPIUtil.leaveServer(membershipId).then(
        payload => dispatch(leftServer(payload)),
        err => dispatch(receiveServerErrors(err.responseJSON))
    );
};

export const getServerByJoinForm = (urlToken,currentUserId) => dispatch => {
    return ServerAPIUtil.getServerByInvite(urlToken)
        .then(
            server => {
                let membership = {
                    userId: currentUserId,
                    joinableId: server.id,
                    joinableType: "Server",
                };
                return joinServer(membership)(dispatch);
            }, err => dispatch(receiveServerErrors(err.responseJSON))
    );
};

export const getServerByUrl = urlToken => dispatch => (
    ServerAPIUtil.getServerByInvite(urlToken).then(
        server => dispatch(receiveInvitedServer(server))
    )
);

export const getUpdatedServerInfo = serverId => dispatch => {
    return ServerAPIUtil.getServer(serverId).then(
        payload => dispatch(receiveServerInfo(payload))
    );
};
>>>>>>> main
