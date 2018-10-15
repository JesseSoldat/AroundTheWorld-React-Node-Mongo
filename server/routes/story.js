// middlewares
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes } = require("../utils/serverRes");

module.exports = app => {
  // list of users stories
  app.get("/api/story/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;
  });
};
