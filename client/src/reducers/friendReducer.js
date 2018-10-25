const {
  FRIEND_ACTION_ERROR,
  FRIEND_REQUESTS_LOADED,
  GET_FRIENDS_REQUESTED,
  GET_FRIENDS_LOADED,
  ACCEPT_FRIEND_REQUEST_STARTED,
  ACCEPT_FRIEND_REQUEST_FINISHED,
  DENY_FRIEND_REQUEST_STARTED,
  DENY_FRIEND_REQUEST_FINISHED
} = require("../actions/friendActions");

const initialState = {
  loading: false,
  overlay: false,
  friends: null,
  friendIds: null,
  friendRequests: null
};

export default (state = initialState, action) => {
  const { type, friends, friendIds, friendRequests } = action;

  switch (type) {
    case FRIEND_ACTION_ERROR:
      return { ...state, loading: false, overlay: false };

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

    case ACCEPT_FRIEND_REQUEST_STARTED:
    case DENY_FRIEND_REQUEST_STARTED:
      return { ...state, overlay: true };

    case ACCEPT_FRIEND_REQUEST_FINISHED:
    case DENY_FRIEND_REQUEST_FINISHED:
      return { ...state, overlay: false };

    default:
      return { ...state };
  }
};
