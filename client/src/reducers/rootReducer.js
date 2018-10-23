import { combineReducers } from "redux";
// 3rd Party
import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as FormReducer } from "redux-form";
// Reducers
import asyncReducer from "./asyncReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import storyReducer from "./storyReducer";
import friendReducer from "./friendReducer";
import imageReducer from "./imageReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  modal: modalReducer,
  toastr: toastrReducer,
  async: asyncReducer,
  auth: authReducer,
  story: storyReducer,
  friend: friendReducer,
  image: imageReducer,
  profile: profileReducer
});

export default rootReducer;
