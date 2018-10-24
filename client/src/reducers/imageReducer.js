import {
  UPLOAD_STORY_IMG_STARTED,
  UPLOAD_STORY_IMG_FINISHED,
  UPLOAD_AVATAR_IMG_STARTED,
  UPLOAD_AVATAR_IMG_FINISHED,
  DELETE_IMG_FROM_STORY_STARTED,
  DELETE_IMG_FROM_STORY_FINISHED,
  IMAGE_ACTION_ERROR
} from "../actions/imageActions";

const initialState = {
  overlay: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_STORY_IMG_STARTED:
    case UPLOAD_AVATAR_IMG_STARTED:
    case DELETE_IMG_FROM_STORY_STARTED:
      return { ...state, overlay: true };

    case UPLOAD_STORY_IMG_FINISHED:
    case UPLOAD_AVATAR_IMG_FINISHED:
    case DELETE_IMG_FROM_STORY_FINISHED:
    case IMAGE_ACTION_ERROR:
      return { ...state, overlay: false };

    default:
      return { ...state };
  }
};
