import * as ServerAPIUtil from '../utils/server_utils';
import { createServerSub } from '../utils/socket_utils';
import { convertToSnakeCase } from '../utils/func_utils';
import { receiveServerSub } from './socket_actions';
import {
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
  RECEIVE_SERVER_ERRORS,
  REMOVE_SERVER_ERRORS,
  REMOVE_SERVER,
  RECEIVE_INVITED_SERVER,
  RECEIVE_NEW_SERVER,
  RECEIVE_JOINED_SERVER,
  LEAVE_SERVER,
  RECEIVE_SERVER_INFO,
  KICK_MEMBER,
  LOAD_MEMBERS,
} from '@constants';

export const receiveServers = (payload) => ({ type: RECEIVE_SERVERS, payload });
export const receiveServer = (server) => ({ type: RECEIVE_SERVER, server });
export const receiveServerErrors = (errors) => ({ type: RECEIVE_SERVER_ERRORS, errors });
export const removeServer = (payload) => ({ type: REMOVE_SERVER, payload });
export const removeServerErrors = () => ({ type: REMOVE_SERVER_ERRORS });
const receiveInvitedServer = (server) => ({ type: RECEIVE_INVITED_SERVER, server });
const receiveNewServer = (payload) => ({ type: RECEIVE_NEW_SERVER, payload });
const receiveJoinedServer = (payload) => ({ type: RECEIVE_JOINED_SERVER, payload });
const receiveServerInfo = (payload) => ({ type: RECEIVE_SERVER_INFO, payload });
export const leftServer = (payload) => ({ type: LEAVE_SERVER, payload });
const removeKickedMember = (payload) => ({ type: KICK_MEMBER, payload });
export const loadMembers = (payload) => ({ type: LOAD_MEMBERS, payload });

export const retrieveUserServers = (userId) => (dispatch) => (
  ServerAPIUtil.getUserServers(userId)
    .then(
      (servers) => dispatch(receiveServers(servers)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);

export const retrieveServerInfo = (serverId) => (dispatch) => (
  ServerAPIUtil.getServer(serverId).then(
    (payload) => dispatch(receiveServerInfo(payload)),
    (err) => dispatch(receiveServerErrors(err.responseJSON)),
  )
);

export const createServer = (server) => (dispatch) => {
  return ServerAPIUtil.createServer(server)
    .then(
      (payload) => {
        const serverSub = createServerSub(payload.server, payload.membership.userId, dispatch);
        dispatch(receiveServerSub({ id: payload.server.id, sub: serverSub }));
        dispatch(receiveNewServer(payload));
      },
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const updateServer = (server, serverId) => (dispatch) => {
  return ServerAPIUtil.updateServer(server, serverId)
    .then(
      (server) => dispatch(receiveServer(server)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const deleteServer = (serverId) => (dispatch) => {
  return ServerAPIUtil.destroyServer(serverId)
    .then(
      (payload) => dispatch(removeServer(payload)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const joinServer = (membership, currentUserId) => (dispatch) => {
  const snakedMembership = convertToSnakeCase(membership);
  return ServerAPIUtil.joinServer(snakedMembership)
    .then(
      (payload) =>  dispatch(receiveJoinedServer(payload)),
      (err) => err,
    );
};

export const leaveServer = (membershipId) => (dispatch) => {
  return ServerAPIUtil.leaveServer(membershipId)
    .then(
      (payload) => dispatch(leftServer(payload)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const kickMember = (membershipId) => (dispatch) => {
  return ServerAPIUtil.leaveServer(membershipId)
    .then(
      (payload) => dispatch(removeKickedMember(payload)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const getServerByJoinForm = (urlToken, currentUserId) => (dispatch) => {
  return ServerAPIUtil.getServerByInvite(urlToken)
    .then(
      (server) => {
        const membership = { userId: currentUserId, joinableId: server.id, joinableType: 'Server' };
        return joinServer(membership, currentUserId)(dispatch);
      }, (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const getServerByUrl = (urlToken) => (dispatch) => (
  ServerAPIUtil.getServerByInvite(urlToken)
    .then((server) => dispatch(receiveInvitedServer(server)))
);

export const getUpdatedServerInfo = (serverId) => (dispatch) => (
  ServerAPIUtil.getServer(serverId)
    .then((payload) => dispatch(receiveServerInfo(payload)))
);
