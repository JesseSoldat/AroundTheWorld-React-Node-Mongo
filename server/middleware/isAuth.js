// models
const User = require("../models/user");
// Utils
const { serverRes } = require("../utils/serverRes");

const authErrMsg = "An error ocurred while authenticating. Please login again.";

const isAuth = async (req, res, next) => {
  const token = req.header("x-auth");

  try {
    if (!token) return serverRes(res, 401, authErrMsg);

    const user = await User.findByToken(token);

    if (!user) return serverRes(res, 401, authErrMsg);

    req.user = user;

    next();
  } catch (err) {
    console.log("Err: isAuth Middleware", err);
    return serverRes(res, 401, authErrMsg);
  }
};

module.exports = isAuth;
