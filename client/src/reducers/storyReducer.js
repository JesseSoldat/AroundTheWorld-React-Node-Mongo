import {
  STORY_ACTION_ERROR,
  STORIES_LOADED,
  CREATE_STORY_STARTED,
  CREATE_STORY_FINISHED,
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

const createNewStory = (preStories, newStory) => {
  let newStories = preStories;
  if (newStories && newStories.length) {
    newStories.unshift(newStory);
  }
  return newStories;
};

export default (state = initialState, action) => {
  const { type, stories, details, matchedDetails, update } = action;

  switch (type) {
    // handle error
    case STORY_ACTION_ERROR:
      return { ...state, overlay: false, loading: false };

    // get all stories
    case STORIES_LOADED:
      return { ...state, stories: [...stories] };

    // create story
    case CREATE_STORY_STARTED:
      return { ...state, overlay: true };

    case CREATE_STORY_FINISHED:
      const newStories = createNewStory(state.stories, update);

      return { ...state, overlay: false, stories: newStories, details: update };

    // get details for a story
    case STORY_DETAILS_LOADED:
      return { ...state, details };

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
