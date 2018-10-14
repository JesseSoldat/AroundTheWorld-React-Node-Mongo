import axios from "axios";
import { toastr } from "react-redux-toastr";
// utils
// helpers
// actions
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
// types
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const startRegister = (user, history) => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.post("/api/register", user);

    const { msg } = res.data;
    toastr.success("Success", msg);
    dispatch(asyncActionFinish());
  } catch (err) {
    toastr.error("Error", err);
    dispatch(asyncActionError());
  }
};
