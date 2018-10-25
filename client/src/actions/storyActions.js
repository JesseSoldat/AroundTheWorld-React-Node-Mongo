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
export const MATCHED_USERS_REQUESTED = "MATCHED_USERS_REQUESTED";
export const MATCHED_USERS_LOADED = "MATCHED_USERS_LOADED";
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

export const startEditStory = (
  storyId,
  updatedStory,
  history
) => async dispatch => {
  try {
    dispatch({ type: EDIT_STORY_STARTED });

    const res = await axios.put(`/api/story/edit/${storyId}`, { updatedStory });

    const { msg, payload } = res.data;

    dispatch(editStory(payload.story));

    history.push(`/storyDetails/${storyId}`);

    toastr.success("Success", msg);
  } catch (err) {
    errorHandling(dispatch, err, "edit", "story");
    dispatch(storyError());
  }
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

// get a list of users who have stories close to your story
export const matchWithOthers = stories => ({
  type: MATCHED_USERS_LOADED,
  matchedStories: stories
});

export const startMatchWithOthers = matchQuery => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: MATCHED_USERS_REQUESTED });
    const userId = getState().auth._id;
    const { unit, maxDistance, coordinates } = matchQuery;
    const lng = coordinates[0];
    const lat = coordinates[1];

    const matchOthersUrl = `/api/story/match/${userId}?lat=${lat}&lng=${lng}&unit=${unit}&maxDistance=${maxDistance}`;
    const myFriendsUrl = `/api/profile/${userId}`;

    const [matchOthers, myFriends] = await Promise.all([
      axios.get(matchOthersUrl),
      axios.get(myFriendsUrl)
    ]);

    const { match } = matchOthers.data.payload;
    const { friends } = myFriends.data.payload.profile;

    const filteredMatch = match.filter(obj => !friends.includes(obj._id));

    dispatch(matchWithOthers(filteredMatch));
    dispatch(openModal({ modalType: "matchUser", data: filteredMatch }));
  } catch (err) {
    errorHandling(dispatch, err, "match", "others");
    dispatch(storyError());
  }
};

// get a matches users list of stories
export const getMatchedUserStoriesRequested = () => ({
  type: MATCHED_STORIES_REQUESTED
});

export const getMatchedUserStories = (matchedStories, matchedUserInfo) => ({
  type: MATCHED_STORIES_LOADED,
  matchedStories,
  matchedUserInfo
});

export const startGetMatchedUserStories = userId => async dispatch => {
  try {
    dispatch(getMatchedUserStoriesRequested());
    const res = await axios.get(`/api/story/${userId}`);

    const { payload } = res.data;

    dispatch(getMatchedUserStories(payload.stories));
  } catch (err) {
    errorHandling(dispatch, err, "get", "stories");
    dispatch(storyError());
  }
};

// get matched user story details
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
