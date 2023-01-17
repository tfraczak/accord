import { CLOSE_MODAL, OPEN_FULL_MODAL, OPEN_MODAL } from '@constants';

export const openModal = (modal) => ({ type: OPEN_MODAL, modal });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const openFullModal = (payload) => ({ type: OPEN_FULL_MODAL, payload });