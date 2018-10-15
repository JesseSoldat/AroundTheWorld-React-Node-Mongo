const { STORIES_LOADED, CREATE_STORY } = require("../actions/storyActions");

const initialState = {
  stories: null
};

export default (state = initialState, action) => {
  const { type, stories } = action;

  switch (type) {
    case STORIES_LOADED:
      return { ...state, stories: [...stories] };
    case CREATE_STORY:
      return { ...state, stories: null };

    default:
      return { ...state };
  }
};
