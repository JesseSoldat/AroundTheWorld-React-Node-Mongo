import {
  PROFILE_ACTION_ERROR,
  PROFILE_REQUESTED,
  PROFILE_LOADED
} from "../actions/profileActions";

const initialState = {
  loading: false,
  overlay: false,
  profile: null
};

export default (state = initialState, action) => {
  const { type, profile } = action;
  switch (type) {
    case PROFILE_ACTION_ERROR:
      return { ...state, loading: false, overlay: false };

    case PROFILE_REQUESTED:
      return { ...state, loading: true };

    case PROFILE_LOADED:
      return { ...state, loading: false, profile };

    default:
      return state;
  }
};
