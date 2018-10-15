import { toastr } from "react-redux-toastr";
// utils
import setAxiosHeader from "../../utils/auth/setAxiosHeader";
// actions
import { AUTH_LOGOUT } from "../authActions";

const errMsg = (method, target) =>
  `An unknown error occurred while trying to ${method} the ${target}.`;

const logoutUser = dispatch => {
  dispatch({ type: AUTH_LOGOUT });
  // axios headers
  setAxiosHeader(null);
  // remove user to local storage
  localStorage.removeItem("user");
};

const errorHandling = (dispatch, err, method, target) => {
  if (err && err.response) {
    const { data } = err.response;

    // check that the server sent the correct msg obj
    if (data) {
      const { msg, options } = data;

      // check for server options
      if (options && options.type) {
        // console.log("options", options);
        const { type } = options;

        if (type === "tokenErr") {
          logoutUser(dispatch);
          return toastr.error("Error", msg);
        }
      } else if (msg) {
        return toastr.error("Error", msg);
      }
    }
    // check for msg with an info property
    else {
      return toastr.error("Error", errMsg(method, target));
    }
  }
};

export default errorHandling;
