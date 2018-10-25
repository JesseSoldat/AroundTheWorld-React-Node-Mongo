const {
  AUTH_ACTION_ERROR,
  AUTH_REGISTER_STARTED,
  AUTH_LOGIN_STARTED,
  AUTHENTICATION_FINISHED,
  AUTH_LOGOUT,
  CHANGE_PASSWORD_STARTED,
  CHANGE_PASSWORD_FINISHED
} = require("../actions/authActions");

const initialState = {
  _id: null,
  role: null,
  overlay: false
};

export default (state = initialState, action) => {
  const { type, _id, role } = action;

  switch (type) {
    case AUTH_ACTION_ERROR:
      return { ...state, overlay: false };

    case AUTH_REGISTER_STARTED:
    case AUTH_LOGIN_STARTED:
      return { ...state, overlay: true };

    case AUTHENTICATION_FINISHED:
      return { ...state, _id, role, overlay: false };

    case AUTH_LOGOUT:
      return { ...state, _id: null, role: null };

    case CHANGE_PASSWORD_STARTED:
      return { ...state, overlay: true };

    case CHANGE_PASSWORD_FINISHED:
      return { ...state, overlay: false };

    default:
      return { ...state };
  }
};
