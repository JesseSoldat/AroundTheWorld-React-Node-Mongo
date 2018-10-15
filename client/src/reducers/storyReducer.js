const { STORY_CREATE } = require("../actions/storyActions");

const initialState = {
  stories: null
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case STORY_CREATE:
      return { ...state, stories: null };

    default:
      return { ...state };
  }
};
