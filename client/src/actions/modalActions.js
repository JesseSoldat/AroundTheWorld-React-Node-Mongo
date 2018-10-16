export const MODAL_CLOSE = "MODAL_CLOSE";
export const MODAL_OPEN = "MODAL_OPEN";

export const openModal = ({ modalType, data }) => {
  return {
    type: MODAL_OPEN,
    modalType,
    data
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE
  };
};
