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
import { openModal } from "./modalActions";
// types
export const STORIES_REQUESTED = "STORIES_REQUESTED";
export const STORIES_LOADED = "STORIES_LOADED";
export const CREATE_STORY = "CREATE_STORY";

// Get Stories
export const getStories = ({ stories }) => ({
  type: STORIES_LOADED,
  stories
});

export const startGetStories = () => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  try {
    const userId = getState().auth._id;

    const res = await axios.get(`/api/story/${userId}`);

    const { payload } = res.data;

    dispatch(getStories(payload));
    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "get", "stories");
    dispatch(asyncActionError());
  }
};

// Create Story
export const createStory = () => ({
  type: CREATE_STORY
});

export const startCreateStory = (newStory, history) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  try {
    const userId = getState().auth._id;

    const res = await axios.post(`/api/story/add/${userId}`, newStory);

    const { msg, payload } = res.data;
    console.log(payload);

    toastr.success("Success", msg);

    dispatch(asyncActionFinish());
  } catch (err) {
    errorHandling(dispatch, err, "create", "story");
    dispatch(asyncActionError());
  }
};

// Match with Other Peoples Stories
export const startMatchWithOthers = matchQuery => async (
  dispatch,
  getState
) => {
  try {
    const userId = getState().auth._id;
    const { unit, maxDistance, coordinates } = matchQuery;
    const lng = coordinates[0];
    const lat = coordinates[1];

    const url = `/api/story/match/${userId}?lat=${lat}&lng=${lng}&unit=${unit}&maxDistance=${maxDistance}`;

    const res = await axios.get(url);

    const { payload } = res.data;

    dispatch(openModal({ modalType: "matchUser", data: payload.match }));
  } catch (err) {
    errorHandling(dispatch, err, "match", "others");
  }
};
