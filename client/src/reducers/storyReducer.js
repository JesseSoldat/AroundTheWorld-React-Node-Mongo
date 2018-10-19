const {
  STORIES_LOADED,
  CREATE_STORY,
  STORY_DETAILS_LOADED,
  MATCHED_STORY_DETAILS_LOADED
} = require("../actions/storyActions");

const initialState = {
  stories: null,
  details: null,
  matchedStories: null,
  matchedDetails: null
};

export default (state = initialState, action) => {
  const { type, stories, details, matchedDetails } = action;

  switch (type) {
    case STORIES_LOADED:
      return { ...state, stories: [...stories] };

    case CREATE_STORY:
      return { ...state, stories: null };

    case STORY_DETAILS_LOADED:
      return { ...state, details };

    case MATCHED_STORY_DETAILS_LOADED:
      return { ...state, matchedDetails };

    default:
      return { ...state };
  }
};
