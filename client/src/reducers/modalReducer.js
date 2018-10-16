import { MODAL_CLOSE, MODAL_OPEN } from "../actions/modalActions";

const initialState = {
  modalType: null,
  data: null
};

export default (state = initialState, action) => {
  const { type, modalType, data } = action;
  switch (type) {
    case MODAL_CLOSE:
      return { ...state, modalType: null, data: null };

    case MODAL_OPEN:
      return {
        ...state,
        modalType,
        data
      };

    default:
      return state;
  }
};
