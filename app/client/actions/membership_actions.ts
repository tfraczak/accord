import { patch } from '@axios';
import {
  RECEIVE_MEMBERSHIPS,
  RECEIVE_MEMBERSHIP,
  REMOVE_MEMBERSHIP,
  RECEIVE_NICKNAME,
} from '@constants';
import { buildUrl } from '@helpers';

const url = (id: number | null = null) => buildUrl('membership', id);

export const receiveMemberships = (memberships) => ({ type: RECEIVE_MEMBERSHIPS, memberships });
export const receiveMembership = (membership) => ({ type: RECEIVE_MEMBERSHIP, membership });
export const removeMembership = (membershipId) => ({ type: REMOVE_MEMBERSHIP, membershipId });
export const receiveNickname = (membership) => ({ type: RECEIVE_NICKNAME, membership });

export const updateNickname = (membership) => (dispatch) => (
  patch({ url: url(membership.id), data: { membership } })
    .then((membership) => dispatch(receiveMembership(membership)))
);