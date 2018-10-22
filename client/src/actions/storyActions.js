import axios from "axios";
import { toastr } from "react-redux-toastr";
import firebase from "firebase/app";
import "firebase/storage";
// helpers
import errorHandling from "./helpers/errorHandling";
// actions
import { openModal } from "./modalActions";
// types
// user
export const STORY_ACTION_ERROR = "STORY_ACTION_ERROR";
export const STORIES_REQUESTED = "STORIES_REQUESTED";
export const STORIES_LOADED = "STORIES_LOADED";
export const CREATE_STORY_STARTED = "CREATE_STORY_STARTED";
export const CREATE_STORY_FINISHED = "CREATE_STORY_FINISHED";
export const EDIT_STORY_STARTED = "EDIT_STORY_STARTED";
export const EDIT_STORY_FINISHED = "EDIT_STORY_FINISHED";
export const DELETE_STORY_STARTED = "DELETE_STORY_STARTED";
export const DELETE_STORY_FINISHED = "DELETE_STORY_FINISHED";
export const STORY_DETAILS_REQUESTED = "STORY_DETAILS_REQUESTED";
export const STORY_DETAILS_LOADED = "STORY_DETAILS_LOADED";

// matched user
export const MATCHED_STORIES_REQUESTED = "MATCHED_STORIES_REQUESTED";
export const MATCHED_STORIES_LOADED = "MATCHED_STORIES_LOADED";
export const MATCHED_STORY_DETAILS_REQUESTED =
  "MATCHED_STORY_DETAILS_REQUESTED";
export const MATCHED_STORY_DETAILS_LOADED = "MATCHED_STORY_DETAILS_LOADED";

// handle any story action errors
export const storyError = () => ({
  type: STORY_ACTION_ERROR
});
// get stories
export const getStories = ({ stories }) => ({
  type: STORIES_LOADED,
  stories
});

export const startGetStories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STORIES_REQUESTED });

    const userId = getState().auth._id;

    const res = await axios.get(`/api/story/${userId}`);

    const { payload } = res.data;

    dispatch(getStories(payload));
  } catch (err) {
    errorHandling(dispatch, err, "get", "stories");
    dispatch(storyError());
  }
};

// get story details
export const getStoryDetails = ({ story }) => ({
  type: STORY_DETAILS_LOADED,
  details: story
});

export const startGetStoryDetails = storyId => async dispatch => {
  try {
    dispatch({ type: STORY_DETAILS_REQUESTED });

    const res = await axios.get(`/api/story/details/${storyId}`);

    const { payload } = res.data;

    dispatch(getStoryDetails(payload));
  } catch (err) {
    errorHandling(dispatch, err, "get", "story");
    dispatch(storyError());
  }
};
// create story
export const createStory = update => ({
  type: CREATE_STORY_FINISHED,
  update
});

export const startCreateStory = (newStory, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_STORY_STARTED });
    const userId = getState().auth._id;

    const res = await axios.post(`/api/story/add/${userId}`, newStory);

    const { msg, payload } = res.data;

    dispatch(createStory(payload.story));

    const storyId = payload.story._id;

    history.push(`/storyDetails/${storyId}`);

    toastr.success("Success", msg);
  } catch (err) {
    errorHandling(dispatch, err, "create", "story");
    dispatch(storyError());
  }
};

// edit story
export const editStory = update => ({
  type: EDIT_STORY_FINISHED,
  update
});

export const startEditStory = (storyId, history) => async dispatch => {
  try {
    dispatch({ type: EDIT_STORY_STARTED });
  } catch (err) {}
};

// delete story
const deleteImagesFromStory = images => {
  images.forEach(img => {
    const storageRef = firebase.storage().ref(img.path);
    storageRef.delete();
  });
};

export const deleteStory = update => ({
  type: DELETE_STORY_FINISHED,
  update
});

export const startDeleteStory = (storyId, history) => async dispatch => {
  try {
    dispatch({ type: DELETE_STORY_STARTED });

    const res = await axios.delete(`/api/story/delete/${storyId}`);

    const { msg, payload } = res.data;

    const { story } = payload;

    // delete images from firebase
    deleteImagesFromStory(story.images);

    history.push("/storyList");

    dispatch(deleteStory(story));

    toastr.success("Success", msg);
  } catch (err) {
    errorHandling(dispatch, err, "delete", "story");
    dispatch(storyError());
  }
};

// match with Other peoples stories
export const matchWithOthers = () => ({
  type: MATCHED_STORIES_LOADED
});
export const startMatchWithOthers = matchQuery => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: MATCHED_STORIES_REQUESTED });
    const userId = getState().auth._id;
    const { unit, maxDistance, coordinates } = matchQuery;
    const lng = coordinates[0];
    const lat = coordinates[1];

    const url = `/api/story/match/${userId}?lat=${lat}&lng=${lng}&unit=${unit}&maxDistance=${maxDistance}`;

    const res = await axios.get(url);

    const { payload } = res.data;

    dispatch(matchWithOthers());
    dispatch(openModal({ modalType: "matchUser", data: payload.match }));
  } catch (err) {
    errorHandling(dispatch, err, "match", "others");
    dispatch(storyError());
  }
};

export const getMatchedStoryDetails = ({ story }) => ({
  type: MATCHED_STORY_DETAILS_LOADED,
  matchedDetails: story
});

export const startGetMatchedStoryDetails = storyId => async dispatch => {
  try {
    dispatch({ type: MATCHED_STORY_DETAILS_REQUESTED });

    const res = await axios.get(`/api/story/details/${storyId}`);

    const { payload } = res.data;

    dispatch(getMatchedStoryDetails(payload));
  } catch (err) {
    errorHandling(dispatch, err, "get", "story");
    dispatch(storyError());
  }
};
