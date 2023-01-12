import { OPEN_MODAL, CLOSE_MODAL, OPEN_FULL_MODAL } from '../../actions/ui_actions';

export default (state = null, action) => {
  Object.freeze(state);
  switch(action.type) {
  case OPEN_MODAL:
    return action.modal;
  case OPEN_FULL_MODAL:
    return action.payload;
  case CLOSE_MODAL:
    return null;
  default:
    return state;
  }
};