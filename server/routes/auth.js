// Models
const User = require("../models/user");
// Middleware
const authFieldsCheck = require("../middleware/authCheckForm");
// Utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // Register
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
      if (err) return serverRes(res, 400, err, null);

      const msg = `${user.email} is now registered.`;

      serverRes(res, 200, msg, { token });
    } catch (err) {
      console.log("Err: Register", err);
      const msg = getErrMsg("err", "register", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // Login
  app.post("/api/login", authFieldsCheck, async (req, res) => {
    const { email, password } = req.body;

    try {
      // returns User or null
      const user = await User.findByCredentials(email, password);

      if (!user) return serverRes(res, 400, getErrMsg("noUser"), null);

      const { token, err } = await user.generateAuthToken();

      // err: false unless set in catch block
      if (err) return serverRes(res, 400, err, null);

      const msg = `${user.email} has logged in successfully.`;

      serverRes(res, 200, msg, { token });
    } catch (err) {
      console.log("Err: Login", err);
      const msg = getErrMsg("err", "login", "user");
      serverRes(res, 400, msg, null);
    }
  });
};
