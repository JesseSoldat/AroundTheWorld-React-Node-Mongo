// models
const User = require("../models/user");
// middlewares
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  app.get("/api/profile/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;

      const profile = await User.findById(userId);

      serverRes(res, 200, null, { profile });
    } catch (err) {
      console.log("Err get profile", err);
      const msg = getErrMsg("err", "fetch", "profile");
      serverRes(res, 401, msg, null);
    }
  });
};
