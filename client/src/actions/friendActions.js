import axios from "axios";
import { toastr } from "react-redux-toastr";
// helpers
import errorHandling from "./helpers/errorHandling";
// types
export const FRIEND_ACTION_ERROR = "FRIEND_ACTION_ERROR";
// loading
export const GET_FRIENDS_REQUESTED = "GET_FRIENDS_REQUESTED";
export const GET_FRIENDS_LOADED = "GET_FRIENDS_LOADED";
export const FRIEND_REQUESTS_REQUESTED = "FRIEND_REQUESTS_REQUESTED";
export const FRIEND_REQUESTS_LOADED = "FRIEND_REQUESTS_LOADED";
// overlay
export const FRIEND_REQUEST_STARTED = "FRIEND_REQUEST_STARTED";
export const FRIEND_REQUEST_FINISHED = "FRIEND_REQUEST_FINISHED";
export const ACCEPT_FRIEND_REQUEST_STARTED = "ACCEPT_FRIEND_REQUEST_STARTED";
export const ACCEPT_FRIEND_REQUEST_FINISHED = "ACCEPT_FRIEND_REQUEST_FINISHED";
export const DENY_FRIEND_REQUEST_STARTED = "DENY_FRIEND_REQUEST_STARTED";
export const DENY_FRIEND_REQUEST_FINISHED = "DENY_FRIEND_REQUEST_FINISHED";

// friend action error
export const friendActionError = () => ({
  type: FRIEND_ACTION_ERROR
});
// get friends
export const getFriends = ({ friends }) => ({
  type: GET_FRIENDS_LOADED,
  friends
});

export const startGetFriends = userId => async dispatch => {
  try {
    dispatch({ type: GET_FRIENDS_REQUESTED });

    const res = await axios.get(`api/friends/${userId}`);

    const { payload } = res.data;

    dispatch(getFriends(payload));
  } catch (err) {
    errorHandling(dispatch, err, "get", "friends");
    dispatch(friendActionError());
  }
};

// --------------- friend requests ----------------------
// get friends and friend request
export const getFriendRequests = ({ friendIds, friendRequests }) => ({
  type: FRIEND_REQUESTS_LOADED,
  friendIds,
  friendRequests
});

export const startGetFriendRequests = userId => async dispatch => {
  try {
    dispatch({ type: FRIEND_REQUESTS_REQUESTED });

    const res = await axios.get(`/api/friend/request/${userId}`);

    const { payload } = res.data;

    dispatch(getFriendRequests(payload));
  } catch (err) {
    errorHandling(dispatch, err, "get", "friend requests");
    dispatch(friendActionError());
  }
};

// send a friend request
export const sendFriendRequest = update => ({
  type: FRIEND_REQUEST_FINISHED,
  update
});

export const startSendFriendRequest = (userId, friendId) => async dispatch => {
  try {
    dispatch({ type: FRIEND_REQUEST_STARTED });

    const res = await axios.post("/api/friend/request", { userId, friendId });

    const { msg, payload } = res.data;

    toastr.success("Success", msg);

    dispatch(sendFriendRequest(payload.friendRequest));
  } catch (err) {
    errorHandling(dispatch, err, "send", "friend request");
    dispatch(friendActionError());
  }
};

// accept a friend request
export const acceptFriendRequest = ({ friendRequest }) => ({
  type: ACCEPT_FRIEND_REQUEST_FINISHED,
  friendRequest
});

export const startAcceptFriendRequest = (
  userId,
  friendId
) => async dispatch => {
  try {
    dispatch({ type: ACCEPT_FRIEND_REQUEST_STARTED });

    const res = await axios.post("/api/friend/request/accept", {
      userId,
      friendId
    });

    const { msg, payload } = res.data;

    toastr.success("Success", msg);

    dispatch(sendFriendRequest(payload));
  } catch (err) {
    errorHandling(dispatch, err, "send", "friend request");
    dispatch(friendActionError());
  }
};

export const denyFriendRequest = () => ({
  type: DENY_FRIEND_REQUEST_FINISHED
});

export const startDenyFriendRequest = () => async dispatch => {
  try {
    dispatch({ type: DENY_FRIEND_REQUEST_STARTED });
  } catch (err) {}
};
