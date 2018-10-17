const { FRIEND_REQUESTS_LOADED } = require("../actions/friendActions");

const initialState = {
  friends: null,
  friendRequests: null
};

export default (state = initialState, action) => {
  const { type, friends, friendRequests } = action;

  switch (type) {
    case FRIEND_REQUESTS_LOADED:
      return {
        ...state,
        friends,
        friendRequests
      };

    default:
      return { ...state };
  }
};
