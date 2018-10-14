const { AUTH_LOGIN, AUTH_LOGOUT } = require("../actions/authActions");

const initialState = {
  _id: null,
  role: null
};

export default (state = initialState, action) => {
  const { type, _id, role } = action;

  switch (type) {
    case AUTH_LOGIN:
      return { ...state, _id, role };

    case AUTH_LOGOUT:
      return { ...state, _id: null, role: null };

    default:
      return { ...state };
  }
};
