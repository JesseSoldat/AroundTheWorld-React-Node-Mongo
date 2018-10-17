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

const rootReducer = combineReducers({
  form: FormReducer,
  modal: modalReducer,
  toastr: toastrReducer,
  async: asyncReducer,
  auth: authReducer,
  story: storyReducer,
  friend: friendReducer
});

export default rootReducer;
