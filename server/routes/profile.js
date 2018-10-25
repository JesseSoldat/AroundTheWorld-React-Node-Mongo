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

      const profile = await User.findById(userId, {
        password: 0,
        role: 0,
        createdAt: 0,
        updatedAt: 0
      });

      serverRes(res, 200, null, { profile });
    } catch (err) {
      console.log("Err get profile", err);
      const msg = getErrMsg("err", "fetch", "profile");
      serverRes(res, 401, msg, null);
    }
  });

  app.post("/api/profile/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const { profile } = req.body;

      const updatedProfile = await User.findByIdAndUpdate(
        userId,
        { $set: { ...profile } },
        { new: true }
      );

      const msg = "Your profile was updated";

      serverRes(res, 200, msg, { profile: updatedProfile });
    } catch (err) {
      console.log("Err update profile", err);
      const msg = getErrMsg("err", "update", "profile");
      serverRes(res, 401, msg, null);
    }
  });
};
