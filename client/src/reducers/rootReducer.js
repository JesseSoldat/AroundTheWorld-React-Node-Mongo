import { combineReducers } from "redux";
// 3rd Party
import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as FormReducer } from "redux-form";
// Reducers
import asyncReducer from "./asyncReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  toastr: toastrReducer,
  async: asyncReducer,
  auth: authReducer
});

export default rootReducer;
