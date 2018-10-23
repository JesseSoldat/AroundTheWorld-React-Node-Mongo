import {
  PROFILE_ACTION_ERROR,
  PROFILE_REQUESTED,
  PROFILE_LOADED,
  EDIT_PROFILE_FINISHED,
  EDIT_PROFILE_STARTED
} from "../actions/profileActions";

const initialState = {
  loading: false,
  overlay: false,
  profile: null
};

export default (state = initialState, action) => {
  const { type, profile, update } = action;
  switch (type) {
    // profile errors
    case PROFILE_ACTION_ERROR:
      return { ...state, loading: false, overlay: false };

    // get profile
    case PROFILE_REQUESTED:
      return { ...state, loading: true };

    case PROFILE_LOADED:
      return { ...state, loading: false, profile };

    // edit profile
    case EDIT_PROFILE_STARTED:
      return { ...state, overlay: true };

    case EDIT_PROFILE_FINISHED:
      return { ...state, overlay: false, profile: update };

    default:
      return state;
  }
};
