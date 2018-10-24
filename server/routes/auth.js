const bcrypt = require("bcryptjs");
// models
const User = require("../models/user");
// middlewares
const isAuth = require("../middleware/isAuth");
const authFieldsCheck = require("../middleware/authCheckForm");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // check token on redirect to dashboard
  app.get("/api/tokenCheck", isAuth, async (req, res) => {
    const authErrMsg =
      "An error ocurred while authenticating. Please login again.";
    try {
      serverRes(res, 200, null);
    } catch (err) {
      console.log("tokenCheck", err);
      serverRes(res, 401, authErrMsg);
    }
  });
  // register
  app.post("/api/register", authFieldsCheck, async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const haveUser = await User.findOne({ email });

      if (haveUser) {
        const msg = getErrMsg("haveUser");
        return serverRes(res, 401, msg, null);
      }

      const user = new User({ username, email, password });

      user["role"] = "user";

      await user.save();

      const { token, err } = await user.generateAuthToken();

      // err: false unless set in catch block
      if (err) return serverRes(res, 401, err, null);

      const msg = `${user.email} is now registered.`;

      const { _id, role } = user;

      serverRes(res, 200, msg, { _id, role, token });
    } catch (err) {
      console.log("Err: Register", err);
      const msg = getErrMsg("err", "register", "user");
      serverRes(res, 401, msg, null);
    }
  });

  // login
  app.post("/api/login", authFieldsCheck, async (req, res) => {
    const { email, password } = req.body;

    try {
      // returns User or null
      const user = await User.findByCredentials(email, password);

      if (!user) return serverRes(res, 401, getErrMsg("noUser"), null);

      const { token, err } = await user.generateAuthToken();

      // err: false unless set in catch block
      if (err) return serverRes(res, 401, err, null);

      const msg = `${user.email} has logged in successfully.`;

      const { _id, role } = user;

      serverRes(res, 200, msg, { _id, role, token });
    } catch (err) {
      const msg = getErrMsg("err", "login", "user");
      serverRes(res, 401, msg, null);
    }
  });

  // change password
  const hashPassword = password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject();
          resolve(hash);
        });
      });
    });
  };

  app.put("/api/password/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const { password } = req.body;

      const hashedPassword = await hashPassword(password);

      await User.findByIdAndUpdate(userId, {
        $set: { password: hashedPassword }
      });

      const msg = "The password was changed";

      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = getErrMsg("err", "change", "password");
      serverRes(res, 401, msg, null);
    }
  });
};
