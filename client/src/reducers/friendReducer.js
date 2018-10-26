import {
  FRIEND_ACTION_ERROR,
  // loading
  FRIEND_REQUESTS_REQUESTED,
  FRIEND_REQUESTS_LOADED,
  GET_FRIENDS_REQUESTED,
  GET_FRIENDS_LOADED,
  GET_FRIEND_DETAILS_REQUESTED,
  GET_FRIEND_DETAILS_LOADED,
  // overlay
  SEND_FRIEND_REQUEST_STARTED,
  SEND_FRIEND_REQUEST_FINISHED,
  ACCEPT_FRIEND_REQUEST_STARTED,
  ACCEPT_FRIEND_REQUEST_FINISHED,
  DENY_FRIEND_REQUEST_STARTED,
  DENY_FRIEND_REQUEST_FINISHED,
  DELETE_FRIEND_STARTED,
  DELETE_FRIEND_FINISHED
} from "../actions/friendActions";
import { AUTH_LOGOUT } from "../actions/authActions";

const initialState = {
  loading: false,
  overlay: false,
  friends: null,
  friendDetails: null,
  friendIds: null,
  friendRequests: null
};

const newFriendRequest = (prevFriendRequests, update) => {
  let friendRequests;

  !prevFriendRequests
    ? (friendRequests = [update])
    : (friendRequests = [...prevFriendRequests, update]);

  return friendRequests;
};

const acceptFriendRequest = (prevFriendRequests, update) => {
  const { friendRequestId } = update;

  if (!prevFriendRequests) return null;

  return prevFriendRequests.filter(obj => obj._id !== friendRequestId);
};

const acceptFriendIds = (prevFriendIds, update) => {
  let friendIds;

  !prevFriendIds
    ? (friendIds = [update.friendId])
    : (friendIds = [...prevFriendIds, update.friendId]);

  return friendIds;
};

const denyFriendRequest = (prevFriendRequests, update) => {
  const { friendRequestId } = update;

  if (!prevFriendRequests) return null;

  const updatedFriendRequests = [...prevFriendRequests];

  const index = updatedFriendRequests.findIndex(
    obj => obj._id === friendRequestId
  );

  // console.log("index", index);

  if (index >= 0) updatedFriendRequests[index].status = "rejected";

  // console.log("updatedFriendRequests", updatedFriendRequests);

  return updatedFriendRequests;
};

const removeFriendId = (prevFriendIds, update) => {
  if (!prevFriendIds) return null;

  return prevFriendIds.filter(id => id !== update.friendId);
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
    case AUTH_LOGOUT:
      return { ...initialState };
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
    case SEND_FRIEND_REQUEST_STARTED:
    case ACCEPT_FRIEND_REQUEST_STARTED:
    case DENY_FRIEND_REQUEST_STARTED:
    case DELETE_FRIEND_STARTED:
      return { ...state, overlay: true };

    case SEND_FRIEND_REQUEST_FINISHED:
      return {
        ...state,
        friendRequests: newFriendRequest(state.friendRequests, update),
        overlay: false
      };

    case ACCEPT_FRIEND_REQUEST_FINISHED:
      // console.log("friendId", update.friendId);
      // console.log("friends", update.friends);
      // console.log("friendRequest id", update.friendRequestId);
      return {
        ...state,
        friends: [...update.friends],
        friendIds: acceptFriendIds(state.friendIds, update),
        friendRequests: acceptFriendRequest(state.friendRequests, update),
        overlay: false
      };

    case DENY_FRIEND_REQUEST_FINISHED:
      return {
        ...state,
        friendRequests: denyFriendRequest(state.friendRequests, update),
        overlay: false
      };

    case DELETE_FRIEND_FINISHED:
      return {
        ...state,
        friendDetails: null,
        friends: [...update.friends],
        friendIds: removeFriendId(state.friendIds, update),
        overlay: false
      };

    default:
      return { ...state };
  }
};
