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
export const STORY_CREATE = "STORY_CREATE";

export const createStory = () => ({
  type: STORY_CREATE
});

export const startCreateStory = (newStory, history) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  try {
    const state = getState();
    const userId = state.auth._id;
    console.log(userId);

    const res = await axios.post(`/api/story/add/${userId}`, newStory);

    const { msg, payload } = res.data;
    console.log(payload);

    // msg
    toastr.success("Success", msg);
    // finish async
    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "create", "story");
    dispatch(asyncActionError());
  }
};
