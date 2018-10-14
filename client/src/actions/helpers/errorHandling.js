import { toastr } from "react-redux-toastr";

const errMsg = (method, target) =>
  `An unknown error occured while trying to ${method} the ${target}.`;

const errorHandling = (err, method, target) => {
  if (err && err.response) {
    const { data } = err.response;

    // check that the server sent the correct msg obj
    if (data) {
      const { msg } = data;

      return toastr.error("Error", msg);
    }
    // check for msg with an info property
    else {
      return toastr.error("Error", errMsg(method, target));
    }
  }
};

export default errorHandling;
