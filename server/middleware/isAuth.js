// models
const User = require("../models/user");
// Utils
const { serverRes } = require("../utils/serverRes");

const authErrMsg = "An error ocurred while authenticating. Please login again.";

const options = {
  type: "tokenErr"
};

const isAuth = async (req, res, next) => {
  const token = req.header("x-auth");

  try {
    if (!token) return serverRes(res, 401, authErrMsg, null, options);

    const user = await User.findByToken(token);

    if (!user) return serverRes(res, 401, authErrMsg, null, options);

    req.user = user;

    next();
  } catch (err) {
    return serverRes(res, 401, authErrMsg, null, options);
  }
};

module.exports = isAuth;
