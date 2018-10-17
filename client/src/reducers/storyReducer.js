const {
  STORIES_LOADED,
  CREATE_STORY,
  MATCHED_STORIES_DETAILS_LOADED
} = require("../actions/storyActions");

const initialState = {
  stories: null,
  details: null,
  matchedStories: null,
  matchedDetails: null
};

export default (state = initialState, action) => {
  const { type, stories, matchedDetails } = action;

  switch (type) {
    case STORIES_LOADED:
      return { ...state, stories: [...stories] };

    case CREATE_STORY:
      return { ...state, stories: null };

    case MATCHED_STORIES_DETAILS_LOADED:
      return { ...state, matchedDetails };

    default:
      return { ...state };
  }
};
