import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";
// utils
import setAxiosHeader from "../utils/auth/setAxiosHeader";
// helpers
import errorHandling from "./helpers/errorHandling";
// actions
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
// types
export const AUTH_ACTION_ERROR = "AUTH_ACTION_ERROR";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const CHANGE_PASSWORD_STARTED = "CHANGE_PASSWORD_STARTED";
export const CHANGE_PASSWORD_FINISHED = "CHANGE_PASSWORD_FINISHED";

// helpers
const authSetup = (dispatch, { _id, token, expires, role }, msg) => {
  // axios headers
  setAxiosHeader(token);
  // set user to local storage
  localStorage.setItem("user", JSON.stringify({ _id, token, expires }));
  // login
  dispatch(login(_id, token, role));
  // msg
  toastr.success("Success", msg);
  // finish async
  dispatch(asyncActionFinish());
};

// auth actions errors
export const authError = () => ({
  type: AUTH_ACTION_ERROR
});

// check token
export const startCheckToken = () => async dispatch => {
  try {
    await axios.get("/api/tokenCheck");
  } catch (err) {
    errorHandling(dispatch, err, "check", "token");
  }
};

// register
export const startRegister = user => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.post("/api/register", user);

    const { msg, payload } = res.data;

    authSetup(dispatch, payload, msg);
  } catch (err) {
    errorHandling(dispatch, err, "register", "user");
    dispatch(asyncActionError());
  }
};

// login
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

    authSetup(dispatch, payload, msg);
  } catch (err) {
    errorHandling(dispatch, err, "login", "user");
    dispatch(asyncActionError());
  }
};

// Logout
export const startLogout = () => dispatch => {
  // axios headers
  setAxiosHeader(null);
  // remove user to local storage
  localStorage.removeItem("user");

  dispatch({ type: AUTH_LOGOUT });
};

// change password
export const changePassword = () => ({
  type: CHANGE_PASSWORD_FINISHED
});

export const startChangePassword = newPassword => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_STARTED });
    const userId = getState().auth._id;

    const res = await axios.put(`/api/password/${userId}`, {
      password: newPassword
    });

    const { msg } = res.data;

    dispatch(changePassword());

    dispatch(reset("passwordForm"));

    toastr.success("Success", msg);
  } catch (err) {
    errorHandling(dispatch, err, "change", "password");
    dispatch(authError());
  }
};
