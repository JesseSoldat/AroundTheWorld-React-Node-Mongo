import axios from "axios";
import { toastr } from "react-redux-toastr";
// helpers
import errorHandling from "./helpers/errorHandling";
// actions

// types
export const PROFILE_ACTION_ERROR = "PROFILE_ACTION_ERROR";
export const PROFILE_REQUESTED = "PROFILE_REQUESTED";
export const PROFILE_LOADED = "PROFILE_LOADED";
export const EDIT_PROFILE_STARTED = "EDIT_PROFILE_STARTED";
export const EDIT_PROFILE_FINISHED = "EDIT_PROFILE_FINISHED";

// handle profile errors;
export const profileError = () => ({
  type: PROFILE_ACTION_ERROR
});
// get user profile
export const getProfile = profile => ({
  type: PROFILE_LOADED,
  profile
});

export const startGetProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_REQUESTED });

    const userId = getState().auth._id;

    const res = await axios.get(`/api/profile/${userId}`);

    const { payload } = res.data;

    dispatch(getProfile(payload.profile));
  } catch (err) {
    errorHandling(dispatch, err, "get", "profile");
    dispatch(profileError());
  }
};

// edit profile
export const editProfile = update => ({
  type: EDIT_PROFILE_FINISHED,
  update
});

export const startEditProfile = profile => async dispatch => {
  try {
    dispatch({ type: EDIT_PROFILE_STARTED });

    const res = await axios.post(`/api/profile/${profile._id}`, { profile });

    const { msg, payload } = res.data;

    dispatch(editProfile(payload.profile));

    toastr.success("Success", msg);
  } catch (err) {
    errorHandling(dispatch, err, "edit", "profile");
    dispatch(profileError());
  }
};
