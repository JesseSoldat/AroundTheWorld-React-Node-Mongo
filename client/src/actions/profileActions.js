import axios from "axios";
import { toastr } from "react-redux-toastr";
import firebase from "firebase/app";
import "firebase/storage";
// helpers
import errorHandling from "./helpers/errorHandling";
// actions

// types
export const PROFILE_ACTION_ERROR = "PROFILE_ACTION_ERROR";
export const PROFILE_REQUESTED = "PROFILE_REQUESTED";
export const PROFILE_LOADED = "PROFILE_LOADED";

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

    console.log(payload);

    dispatch(getProfile(payload.profile));
  } catch (err) {
    errorHandling(dispatch, err, "get", "profile");
    dispatch(profileError());
  }
};
