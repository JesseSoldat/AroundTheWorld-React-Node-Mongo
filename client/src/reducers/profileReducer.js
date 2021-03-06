import {
  PROFILE_ACTION_ERROR,
  // loading
  PROFILE_REQUESTED,
  PROFILE_LOADED,
  // overlay
  EDIT_PROFILE_FINISHED,
  EDIT_PROFILE_STARTED
} from "../actions/profileActions";
import { AUTH_LOGOUT } from "../actions/authActions";

const initialState = {
  loading: false,
  overlay: false,
  profile: null
};

export default (state = initialState, action) => {
  const { type, profile, update } = action;
  switch (type) {
    case AUTH_LOGOUT:
      return { ...initialState };
    // profile errors clear loading and overlay
    case PROFILE_ACTION_ERROR:
      return { ...state, loading: false, overlay: false };

    // loading
    case PROFILE_REQUESTED:
      return { ...state, loading: true };

    case PROFILE_LOADED:
      return { ...state, loading: false, profile };

    // overlay
    case EDIT_PROFILE_STARTED:
      return { ...state, overlay: true };

    case EDIT_PROFILE_FINISHED:
      return { ...state, overlay: false, profile: update };

    default:
      return state;
  }
};
