import {
  STORY_ACTION_ERROR,
  // loading
  STORIES_REQUESTED,
  STORIES_LOADED,
  STORY_DETAILS_REQUESTED,
  STORY_DETAILS_LOADED,
  MATCHED_USERS_LOADED,
  MATCHED_USERS_REQUESTED,
  MATCHED_STORIES_REQUESTED,
  MATCHED_STORIES_LOADED,
  MATCHED_STORY_DETAILS_REQUESTED,
  MATCHED_STORY_DETAILS_LOADED,
  // overlay
  CREATE_STORY_STARTED,
  CREATE_STORY_FINISHED,
  EDIT_STORY_STARTED,
  EDIT_STORY_FINISHED,
  DELETE_STORY_STARTED,
  DELETE_STORY_FINISHED
} from "../actions/storyActions";
import {
  // overlay
  UPLOAD_STORY_IMG_FINISHED,
  DELETE_IMG_FROM_STORY_FINISHED
} from "../actions/imageActions";

const initialState = {
  overlay: false,
  loading: false,
  stories: null,
  details: null,
  matchedStories: null,
  matchedDetails: null
};

// helpers
const createStory = (prevStories, newStory) => {
  if (!prevStories) return null;

  const newStories = [...prevStories];

  newStories.unshift(newStory);

  return newStories;
};

const editStory = (prevStories, editStory) => {
  if (!prevStories) return null;

  let newStories = [...prevStories];

  newStories = newStories.filter(story => story._id !== editStory._id);

  newStories.unshift(editStory);

  return newStories;
};

const deleteStory = (prevStories, deletedStory) => {
  if (!prevStories) return null;

  let newStories = [...prevStories];

  newStories = newStories.filter(story => story._id !== deletedStory._id);

  return newStories;
};

export default (state = initialState, action) => {
  const {
    type,
    stories,
    details,
    matchedStories,
    matchedDetails,
    update
  } = action;

  switch (type) {
    // handle error
    case STORY_ACTION_ERROR:
      return { ...state, overlay: false, loading: false };

    // ------- loading -------
    // get all stories
    case STORIES_REQUESTED:
      return { ...state, loading: true };

    case STORIES_LOADED:
      return { ...state, stories: [...stories], loading: false };

    // get details for a story
    case STORY_DETAILS_REQUESTED:
      return { ...state, loading: true };

    case STORY_DETAILS_LOADED:
      return { ...state, details, loading: false };

    // get the stories of a matched user
    case MATCHED_STORIES_REQUESTED:
      return { ...state, loading: true };

    case MATCHED_STORIES_LOADED:
      return {
        ...state,
        matchedStories: [...matchedStories],
        loading: false
      };

    // get the details of a matched user's story
    case MATCHED_STORY_DETAILS_REQUESTED:
      return { ...state, loading: true };

    case MATCHED_STORY_DETAILS_LOADED:
      return { ...state, matchedDetails, loading: false };

    // -------- overlay --------
    // create story
    case CREATE_STORY_STARTED:
      return { ...state, overlay: true };

    case CREATE_STORY_FINISHED:
      const newStories = createStory(state.stories, update);
      return { ...state, overlay: false, stories: newStories, details: update };

    // edit story
    case EDIT_STORY_STARTED:
      return { ...state, overlay: true };

    case EDIT_STORY_FINISHED:
      const editStories = editStory(state.stories, update);
      return {
        ...state,
        overlay: false,
        stories: editStories,
        details: update
      };

    // delete story
    case DELETE_STORY_STARTED:
      return { ...state, overlay: true };

    case DELETE_STORY_FINISHED:
      const deleteStories = deleteStory(state.stories, update);
      return {
        ...state,
        overlay: false,
        stories: deleteStories,
        details: null
      };

    // get a list of matched users
    case MATCHED_USERS_REQUESTED:
      return { ...state, overlay: true };

    case MATCHED_USERS_LOADED:
      return { ...state, overlay: false };

    // add an image to a story
    case UPLOAD_STORY_IMG_FINISHED:
      return { ...state, details: update };

    // delete an image from a story
    case DELETE_IMG_FROM_STORY_FINISHED:
      return { ...state, details: update };

    default:
      return { ...state };
  }
};
