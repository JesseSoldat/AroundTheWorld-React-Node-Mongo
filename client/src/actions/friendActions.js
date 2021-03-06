import axios from "axios";
import { toastr } from "react-redux-toastr";
// helpers
import errorHandling from "./helpers/errorHandling";
// types
export const FRIEND_ACTION_ERROR = "FRIEND_ACTION_ERROR";
// loading
export const GET_FRIENDS_REQUESTED = "GET_FRIENDS_REQUESTED";
export const GET_FRIENDS_LOADED = "GET_FRIENDS_LOADED";
export const GET_FRIEND_DETAILS_REQUESTED = "GET_FRIEND_DETAILS_REQUESTED";
export const GET_FRIEND_DETAILS_LOADED = "GET_FRIEND_DETAILS_LOADED";
export const FRIEND_REQUESTS_REQUESTED = "FRIEND_REQUESTS_REQUESTED";
export const FRIEND_REQUESTS_LOADED = "FRIEND_REQUESTS_LOADED";
// overlay
export const SEND_FRIEND_REQUEST_STARTED = "FRIEND_REQUEST_STARTED";
export const SEND_FRIEND_REQUEST_FINISHED = "FRIEND_REQUEST_FINISHED";
export const ACCEPT_FRIEND_REQUEST_STARTED = "ACCEPT_FRIEND_REQUEST_STARTED";
export const ACCEPT_FRIEND_REQUEST_FINISHED = "ACCEPT_FRIEND_REQUEST_FINISHED";
export const DENY_FRIEND_REQUEST_STARTED = "DENY_FRIEND_REQUEST_STARTED";
export const DENY_FRIEND_REQUEST_FINISHED = "DENY_FRIEND_REQUEST_FINISHED";
export const DELETE_FRIEND_STARTED = "DELETE_FRIEND_STARTED";
export const DELETE_FRIEND_FINISHED = "DELETE_FRIEND_FINISHED";

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

// get friend details
export const getFriendDetails = ({ friendDetails }) => ({
  type: GET_FRIEND_DETAILS_LOADED,
  friendDetails
});

export const startGetFriendDetails = friendId => async dispatch => {
  try {
    dispatch({ type: GET_FRIEND_DETAILS_REQUESTED });

    const res = await axios.get(`/api/friendDetails/${friendId}`);

    const { payload } = res.data;

    dispatch(getFriendDetails(payload));
  } catch (err) {
    errorHandling(dispatch, err, "get", "friend details");
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
  type: SEND_FRIEND_REQUEST_FINISHED,
  update
});

export const startSendFriendRequest = (userId, friendId) => async dispatch => {
  try {
    dispatch({ type: SEND_FRIEND_REQUEST_STARTED });

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
export const acceptFriendRequest = update => ({
  type: ACCEPT_FRIEND_REQUEST_FINISHED,
  update
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

    dispatch(acceptFriendRequest(payload));
  } catch (err) {
    errorHandling(dispatch, err, "accept", "friend request");
    dispatch(friendActionError());
  }
};

export const denyFriendRequest = update => ({
  type: DENY_FRIEND_REQUEST_FINISHED,
  update
});

export const startDenyFriendRequest = (userId, friendId) => async dispatch => {
  try {
    dispatch({ type: DENY_FRIEND_REQUEST_STARTED });

    const res = await axios.post("/api/friend/request/deny", {
      userId,
      friendId
    });

    const { msg, payload } = res.data;

    toastr.success("Success", msg);

    dispatch(denyFriendRequest(payload));
  } catch (err) {
    errorHandling(dispatch, err, "deny", "friend request");
    dispatch(friendActionError());
  }
};

// delete friend
export const deleteFriend = update => ({
  type: DELETE_FRIEND_FINISHED,
  update
});

export const startDeleteFriend = (friendId, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_FRIEND_STARTED });

    const userId = getState().auth._id;

    const res = await axios.post(`/api/friend/remove`, { userId, friendId });

    const { msg, payload } = res.data;

    toastr.success("Success", msg);

    dispatch(deleteFriend(payload));

    history.push("/friends");
  } catch (err) {
    errorHandling(dispatch, err, "delete", "friend");
    dispatch(friendActionError());
  }
};
