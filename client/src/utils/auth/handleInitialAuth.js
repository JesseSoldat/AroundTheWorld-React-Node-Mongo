import { toastr } from "react-redux-toastr";
import { AUTHENTICATION_FINISHED } from "../../actions/authActions";
// utils
import setAxiosHeader from "./setAxiosHeader";
import isTokenExp from "./isTokenExp";

const handleInitialAuth = (store, renderApp) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Have user
  if (user) {
    const { _id, token } = user;

    const { role, tokenIsExpired } = isTokenExp(token);

    // Token is expired
    if (tokenIsExpired) {
      localStorage.removeItem("user");

      setAxiosHeader(null);

      renderApp();
      toastr.info("Info", "Your Token is expired");
    }
    // Token is good
    else {
      store.dispatch({
        type: AUTHENTICATION_FINISHED,
        _id,
        token,
        role
      });

      setAxiosHeader(token);

      renderApp();
    }
  }
  // No user
  else {
    setAxiosHeader(null);

    renderApp();
  }
};

export default handleInitialAuth;
