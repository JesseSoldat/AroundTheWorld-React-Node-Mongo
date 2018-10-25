import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";
// utils
import setAxiosHeader from "../utils/auth/setAxiosHeader";
// helpers
import errorHandling from "./helpers/errorHandling";
// types
export const AUTH_ACTION_ERROR = "AUTH_ACTION_ERROR";
export const AUTH_REGISTER_STARTED = "AUTH_REGISTER_STARTED";
export const AUTH_LOGIN_STARTED = "AUTH_LOGIN_STARTED";
export const AUTHENTICATION_FINISHED = "AUTHENTICATION_FINISHED";

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
  dispatch(authentication(_id, token, role));
  // msg
  toastr.success("Success", msg);
};

// auth actions errors
export const authError = () => ({
  type: AUTH_ACTION_ERROR
});

// login && register
export const authentication = (_id, token, role) => ({
  type: AUTHENTICATION_FINISHED,
  _id,
  token,
  role
});

// register
export const startRegister = user => async dispatch => {
  try {
    dispatch({ type: AUTH_REGISTER_STARTED });

    const res = await axios.post("/api/register", user);

    const { msg, payload } = res.data;

    authSetup(dispatch, payload, msg);
  } catch (err) {
    errorHandling(dispatch, err, "register", "user");
    dispatch(authError());
  }
};

// login
export const startLogin = user => async dispatch => {
  try {
    dispatch({ type: AUTH_LOGIN_STARTED });

    const res = await axios.post("/api/login", user);

    const { msg, payload } = res.data;

    authSetup(dispatch, payload, msg);
  } catch (err) {
    errorHandling(dispatch, err, "login", "user");
    dispatch(authError());
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

// check token
export const startCheckToken = () => async dispatch => {
  try {
    await axios.get("/api/tokenCheck");
  } catch (err) {
    errorHandling(dispatch, err, "check", "token");
  }
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
