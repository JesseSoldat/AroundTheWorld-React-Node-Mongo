import axios from "axios";
import { toastr } from "react-redux-toastr";
// helpers
import errorHandling from "./helpers/errorHandling";
// actions
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
// types
// friends
export const GET_FRIENDS_REQUESTED = "GET_FRIENDS_REQUESTED";
export const GET_FRIENDS_LOADED = "GET_FRIENDS_LOADED";
// friend request
export const FRIEND_REQUESTS_REQUESTED = "FRIEND_REQUESTS_REQUESTED";
export const FRIEND_REQUESTS_LOADED = "FRIEND_REQUESTS_LOADED";
export const FRIEND_REQUEST_STARTED = "FRIEND_REQUEST_STARTED";
export const FRIEND_REQUEST_FINISHED = "FRIEND_REQUEST_FINISHED";
export const ACCEPT_FRIEND_REQUEST_STARTED = "ACCEPT_FRIEND_REQUEST_STARTED";
export const ACCEPT_FRIEND_REQUEST_FINISHED = "ACCEPT_FRIEND_REQUEST_FINISHED";

// get friends
export const getFriends = ({ friends }) => ({
  type: GET_FRIENDS_LOADED,
  friends
});

export const startGetFriends = userId => async dispatch => {
  try {
    dispatch(asyncActionStart());
    dispatch({ type: GET_FRIENDS_REQUESTED });

    const res = await axios.get(`api/friends/${userId}`);

    const { payload } = res.data;

    console.log(payload);

    dispatch(getFriends(payload));
    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "get", "friends");
    dispatch(asyncActionError());
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
    dispatch(asyncActionStart());
    dispatch({ type: FRIEND_REQUESTS_REQUESTED });

    const res = await axios.get(`/api/friend/request/${userId}`);

    const { payload } = res.data;

    dispatch(getFriendRequests(payload));
    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "get", "friend requests");
    dispatch(asyncActionError());
  }
};

// send a friend request
export const sendFriendRequest = ({ friendRequest }) => ({
  type: FRIEND_REQUEST_FINISHED,
  friendRequest
});

export const startSendFriendRequest = (userId, friendId) => async dispatch => {
  try {
    dispatch(asyncActionStart());
    dispatch({ type: FRIEND_REQUEST_STARTED });

    const res = await axios.post("/api/friend/request", { userId, friendId });

    const { msg, payload } = res.data;

    console.log(payload);

    toastr.success("Success", msg);

    dispatch(sendFriendRequest(payload));
    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "send", "friend request");
    dispatch(asyncActionError());
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
    dispatch(asyncActionStart());
    dispatch({ type: ACCEPT_FRIEND_REQUEST_STARTED });

    const res = await axios.post("/api/friend/request/accept", {
      userId,
      friendId
    });

    const { msg, payload } = res.data;

    console.log(payload, msg);

    toastr.success("Success", msg);

    dispatch(sendFriendRequest(payload));
    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "send", "friend request");
    dispatch(asyncActionError());
  }
};