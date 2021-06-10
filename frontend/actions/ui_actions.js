export const OPEN_MODAL = "OPEN_MODAL";
export const OPEN_FULL_MODAL = "OPEN_FULL_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = modal => {
  return({
    type: OPEN_MODAL,
    modal
  })
};

export const closeModal = () => {
  return({
    type: CLOSE_MODAL,
  })
};

export const openFullModal = payload => {
  return ({
    type: OPEN_FULL_MODAL,
    payload
  });
};