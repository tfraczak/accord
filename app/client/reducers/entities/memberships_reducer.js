import {
  RECEIVE_MEMBERSHIP,
  RECEIVE_MEMBERSHIPS,
  REMOVE_MEMBERSHIP,
  RECEIVE_SERVERS,
  REMOVE_SERVER,
  RECEIVE_JOINED_SERVER,
  RECEIVE_NEW_SERVER,
  RECEIVE_SERVER_INFO,
  LEAVE_SERVER,
  KICK_MEMBER,
  LOAD_MEMBERS,
  RECEIVE_USER_LOAD_DATA,
  RECEIVE_PRIVATE_USER_LOAD_DATA,
  LOGOUT_CURRENT_USER,
  RECEIVE_NEW_CONVERSATION,
  RECEIVE_CONVERSATION,
  RECEIVE_NEW_MEMBER,
} from '@constants';


export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let membership, memberships, membershipId, membershipIds;
  switch (action.type) {
  case RECEIVE_MEMBERSHIPS:
    return Object.assign({}, state, action.memberships);
  case RECEIVE_SERVERS:
    return Object.assign({}, state, action.payload.memberships);
  case RECEIVE_USER_LOAD_DATA:
    memberships = action.payload.memberships;
    return Object.assign({}, state, memberships);
  case RECEIVE_MEMBERSHIP:
    return Object.assign({}, state, { [action.membership.id]: action.membership });
  case RECEIVE_NEW_MEMBER:
    membership = action.payload.membership;
    return Object.assign({}, state, { [membership.id]: membership });
  case LOAD_MEMBERS:
    memberships = action.payload.memberships;
    nextState = Object.assign({}, state);
    for (let membership of memberships) { nextState[membership.id] = membership; }
    return nextState;
  case LEAVE_SERVER:
    nextState = Object.assign({}, state);
    membershipIds = Object.values(action.payload.membershipIds);
    for(let id of membershipIds) { delete nextState[id]; }
    return nextState;
  case REMOVE_SERVER:
    nextState = Object.assign({}, state);
    membershipIds = Object.values(action.payload.membershipIds);
    for(let id of membershipIds) { delete nextState[id]; }
    return nextState;
  case RECEIVE_JOINED_SERVER:
    memberships = action.payload.memberships;
    return Object.assign({}, state, memberships);
  case RECEIVE_NEW_SERVER:
    membership = action.payload.membership;
    return Object.assign({}, state, { [membership.id]: membership });
  case KICK_MEMBER:
    nextState = Object.assign({}, state);
    membership = action.payload.membership;
    delete nextState[membership.id];
    return nextState;
  case REMOVE_MEMBERSHIP:
    nextState = Object.assign({}, state);
    membershipId = action.membershipId;
    delete nextState[membershipId];
    return nextState;
  case RECEIVE_SERVER_INFO:
    memberships = action.payload.memberships;
    return Object.assign({}, state, memberships);
  case RECEIVE_PRIVATE_USER_LOAD_DATA:
    return Object.assign({}, state, action.payload.memberships);
  case RECEIVE_CONVERSATION:
    return Object.assign({}, state, action.payload.memberships);
  case RECEIVE_NEW_CONVERSATION:
    membership = action.payload.membership;
    return Object.assign({}, state, { [membership.id]: membership });
  case LOGOUT_CURRENT_USER:
    return {};
  default:
    return state;
  }
};