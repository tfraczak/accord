import { receiveServerErrors } from './server_actions';
import * as ServerAPIUtil from '../utils/server_utils';
import * as MembershipAPIUtil from '../utils/membership_utils';

export const RECEIVE_MEMBERSHIPS = "RECEIVE_MEMBERSHIPS";
export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";
export const RECEIVE_NICKNAME = "RECEIVE_NICKNAME";

export const receiveMemberships = memberships => ({
    type: RECEIVE_MEMBERSHIPS,
    memberships,
});

export const receiveMembership = membership => ({
    type: RECEIVE_MEMBERSHIP,
    membership,
});

export const removeMembership = membershipId => ({
    type: REMOVE_MEMBERSHIP,
    membershipId,
});

export const receiveNickname = payload => ({
    type: RECEIVE_NICKNAME,
    payload,
})

export const retrieveServerMemberships = serverId => dispatch => {
    return ServerAPIUtil.getMemberships(serverId).then(memberships => {
        dispatch(receiveMemberships(memberships));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};

export const updateNickname = membership => dispatch => {
    return MembershipAPIUtil.updateNickname(membership)
        .then(
            payload => dispatch(receiveNickname(payload))
        )
}