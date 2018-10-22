const {
  FRIEND_ACTION_ERROR,
  FRIEND_REQUESTS_LOADED,
  GET_FRIENDS_REQUESTED,
  GET_FRIENDS_LOADED
} = require("../actions/friendActions");

const initialState = {
  loading: false,
  friends: null,
  friendIds: null,
  friendRequests: null
};

export default (state = initialState, action) => {
  const { type, friends, friendIds, friendRequests } = action;

  switch (type) {
    case FRIEND_ACTION_ERROR:
      return { ...state, loading: false };

    case GET_FRIENDS_REQUESTED:
      return { ...state, loading: true };

    case GET_FRIENDS_LOADED:
      return {
        ...state,
        friends,
        loading: false
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
