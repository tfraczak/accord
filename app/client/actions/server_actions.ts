import { get, post } from '@axios';
import { buildUrl } from '@helpers';
import { createServerSub } from '../utils/socket_utils';
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

const serversURL = (id: null | number = null) => buildUrl('servers', id);

export const retrieveUserServers = (userId) => (dispatch) => (
  get({ url: `${buildUrl('users', userId)}/servers` })
    .then(
      (servers) => dispatch(receiveServers(servers)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);

export const retrieveServerInfo = (serverId) => (dispatch) => (
  get({ url: serversURL(serverId) })
    .then(
      (payload) => dispatch(receiveServerInfo(payload)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);

export const createServer = (server) => (dispatch) => {
  return post({ url: serversURL(), data: { server } })
    .then(
      (payload) => {
        const serverSub = createServerSub(payload.server, payload.membership.userId, dispatch);
        dispatch(receiveServerSub({ id: payload.server.id, sub: serverSub }));
        dispatch(receiveNewServer(payload));
      },
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const joinServer = (membership) => (dispatch) => {
  return post({ url: `${serversURL(membership.joinableId)}/memberships`, data: { membership } })
    .then(
      ({ data: payload }) =>  dispatch(receiveJoinedServer(payload)),
      (err) => err,
    );
};

export const getServerByJoinForm = (urlToken, currentUserId) => (dispatch) => {
  return get({ url: buildUrl('invitations', urlToken) })
    .then(
      ({ data: server }) => {
        const membership = { userId: currentUserId, joinableId: server.id, joinableType: 'Server' };
        return dispatch(joinServer(membership));
      },
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    );
};

export const getServerByUrl = (urlToken) => (dispatch) => (
  get({ url: buildUrl('invitations', urlToken) })
    .then(({ data: server }) => dispatch(receiveInvitedServer(server)))
);

export const getUpdatedServerInfo = (serverId) => (dispatch) => (
  get({ url: serversURL(serverId) })
    .then((payload) => dispatch(receiveServerInfo(payload)))
);
