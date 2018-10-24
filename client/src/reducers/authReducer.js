const {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  CHANGE_PASSWORD_STARTED,
  CHANGE_PASSWORD_FINISHED
} = require("../actions/authActions");

const initialState = {
  _id: null,
  role: null,
  overylay: false
};

export default (state = initialState, action) => {
  const { type, _id, role } = action;

  switch (type) {
    case AUTH_LOGIN:
      return { ...state, _id, role };

    case AUTH_LOGOUT:
      return { ...state, _id: null, role: null };

    case CHANGE_PASSWORD_STARTED:
      return { ...state, overylay: true };

    case CHANGE_PASSWORD_FINISHED:
      return { ...state, overylay: false };

    default:
      return { ...state };
  }
};
