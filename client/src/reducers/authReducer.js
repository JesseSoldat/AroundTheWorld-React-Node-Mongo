const { AUTH_LOGIN, AUTH_LOGOUT } = require("../actions/authActions");

const initialState = {
  _id: null,
  token: null,
  role: null
};

export default (state = initialState, action) => {
  const { type, _id, token, role } = action;

  switch (type) {
    case AUTH_LOGIN:
      return { ...state, _id, token, role };

    case AUTH_LOGOUT:
      return { ...state, _id, token, role };

    default:
      return { ...state };
  }
};
