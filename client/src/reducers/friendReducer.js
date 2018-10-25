const {
  FRIEND_ACTION_ERROR,
  // loading
  FRIEND_REQUESTS_REQUESTED,
  FRIEND_REQUESTS_LOADED,
  GET_FRIENDS_REQUESTED,
  GET_FRIENDS_LOADED,
  GET_FRIEND_DETAILS_REQUESTED,
  GET_FRIEND_DETAILS_LOADED,
  // overlay
  FRIEND_REQUEST_STARTED,
  FRIEND_REQUEST_FINISHED,
  ACCEPT_FRIEND_REQUEST_STARTED,
  ACCEPT_FRIEND_REQUEST_FINISHED,
  DENY_FRIEND_REQUEST_STARTED,
  DENY_FRIEND_REQUEST_FINISHED
} = require("../actions/friendActions");

const initialState = {
  loading: false,
  overlay: false,
  friends: null,
  friendDetails: null,
  friendIds: null,
  friendRequests: null
};

const newFriendRequest = (prevFriendRequests, update) => {
  if (!prevFriendRequests) prevFriendRequests = [];
  prevFriendRequests.push(update);
  return prevFriendRequests;
};

export default (state = initialState, action) => {
  const {
    type,
    friends,
    friendDetails,
    friendIds,
    friendRequests,
    update
  } = action;

  switch (type) {
    // clear loading and overlay
    case FRIEND_ACTION_ERROR:
      return { ...state, loading: false, overlay: false };

    // loading
    case GET_FRIENDS_REQUESTED:
      return { ...state, loading: true };

    case GET_FRIENDS_LOADED:
      return {
        ...state,
        friends,
        loading: false
      };

    case GET_FRIEND_DETAILS_REQUESTED:
      return { ...state, loading: true };

    case GET_FRIEND_DETAILS_LOADED:
      return { ...state, friendDetails, loading: false };

    // nav component loads friends request at start of app for authenticated users
    // when authentication updates it will requests the users friends
    // do not show loading this will be handled in the background
    case FRIEND_REQUESTS_REQUESTED:
      return { ...state };

    case FRIEND_REQUESTS_LOADED:
      return {
        ...state,
        friendIds,
        friendRequests
      };

    // overlay
    case FRIEND_REQUEST_STARTED:
    case ACCEPT_FRIEND_REQUEST_STARTED:
    case DENY_FRIEND_REQUEST_STARTED:
      return { ...state, overlay: true };

    case FRIEND_REQUEST_FINISHED:
      const updatedFriendRequests = newFriendRequest(
        state.friendRequests,
        update
      );
      return {
        ...state,
        friendRequests: [...updatedFriendRequests],
        overlay: false
      };

    case ACCEPT_FRIEND_REQUEST_FINISHED:
    case DENY_FRIEND_REQUEST_FINISHED:
      return { ...state, overlay: false };

    default:
      return { ...state };
  }
};
