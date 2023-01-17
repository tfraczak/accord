export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const OPEN_FULL_MODAL: 'OPEN_FULL_MODAL' = 'OPEN_FULL_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';
export type UI_ACTION_TYPES = (
  typeof OPEN_MODAL |
  typeof OPEN_FULL_MODAL |
  typeof CLOSE_MODAL
);