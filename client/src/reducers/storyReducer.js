import {
  STORY_ACTION_ERROR,
  STORIES_REQUESTED,
  STORIES_LOADED,
  CREATE_STORY_STARTED,
  CREATE_STORY_FINISHED,
  DELETE_STORY_STARTED,
  DELETE_STORY_FINISHED,
  STORY_DETAILS_REQUESTED,
  STORY_DETAILS_LOADED,
  MATCHED_STORY_DETAILS_LOADED
} from "../actions/storyActions";
import {
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
const createStory = (preStories, newStory) => {
  if (!preStories) return null;

  const newStories = [...preStories];

  newStories.unshift(newStory);

  return newStories;
};

const deleteStory = (preStories, deletedStory) => {
  if (!preStories) return null;

  let newStories = [...preStories];

  newStories = newStories.filter(story => story._id !== deletedStory._id);

  return newStories;
};

export default (state = initialState, action) => {
  const { type, stories, details, matchedDetails, update } = action;

  switch (type) {
    // handle error
    case STORY_ACTION_ERROR:
      return { ...state, overlay: false, loading: false };

    // get all stories
    case STORIES_REQUESTED:
      return { ...state, loading: true };

    case STORIES_LOADED:
      return { ...state, stories: [...stories], loading: false };

    // create story
    case CREATE_STORY_STARTED:
      return { ...state, overlay: true };

    case CREATE_STORY_FINISHED:
      const newStories = createStory(state.stories, update);

      return { ...state, overlay: false, stories: newStories, details: update };

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

    // get details for a story
    case STORY_DETAILS_REQUESTED:
      return { ...state, loading: true };

    case STORY_DETAILS_LOADED:
      return { ...state, details, loading: false };

    // get the details of a matched user's story
    case MATCHED_STORY_DETAILS_LOADED:
      return { ...state, matchedDetails };

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
