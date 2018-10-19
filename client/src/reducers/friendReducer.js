const {
  FRIEND_REQUESTS_LOADED,
  GET_FRIENDS_LOADED
} = require("../actions/friendActions");

const initialState = {
  friends: null,
  friendIds: null,
  friendRequests: null
};

export default (state = initialState, action) => {
  const { type, friends, friendIds, friendRequests } = action;

  switch (type) {
    case GET_FRIENDS_LOADED:
      return {
        ...state,
        friends
      };

    case FRIEND_REQUESTS_LOADED:
      return {
        ...state,
        friendIds,
        friendRequests
      };

    default:
      return { ...state };
  }
};
