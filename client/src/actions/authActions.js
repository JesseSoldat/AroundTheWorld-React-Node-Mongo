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

// Auth
const authSetup = (dispatch, { _id, token, expires, role }, msg) => {
  // axios headers
  // setAxiosHeader(token);
  // set user to local storage
  localStorage.setItem("user", JSON.stringify({ _id, token, expires }));
  // login
  dispatch(login(_id, token, role));
  // msg
  toastr.success("Success", msg);
  // finish async
  dispatch(asyncActionFinish());
};

// Register
export const startRegister = user => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.post("/api/register", user);

    const { msg, payload } = res.data;

    authSetup(dispatch, payload, msg);
  } catch (err) {
    toastr.error("Error", err);
    dispatch(asyncActionError());
  }
};

// Login
export const login = (_id, token, role) => ({
  type: AUTH_LOGIN,
  _id,
  token,
  role
});

export const startLogin = user => async dispatch => {
  try {
    const res = await axios.post("/api/login", user);

    const { msg, payload } = res.data;
  } catch (err) {}
};
