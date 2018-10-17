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
export const FRIEND_REQUESTS_REQUESTED = "FRIEND_REQUESTS_REQUESTED";
export const FRIEND_REQUESTS_LOADED = "FRIEND_REQUESTS_LOADED";

export const getFriendRequests = ({ friends, friendRequests }) => ({
  type: FRIEND_REQUESTS_LOADED,
  friends,
  friendRequests
});

export const startGetFriendRequests = userId => async dispatch => {
  dispatch(asyncActionStart());
  dispatch({ type: FRIEND_REQUESTS_REQUESTED });
  try {
    const res = await axios.get(`/api/friend/request/${userId}`);

    const { payload } = res.data;

    dispatch(getFriendRequests(payload));
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);

    errorHandling(dispatch, err, "get", "friend requests");
    dispatch(asyncActionError());
  }
};
