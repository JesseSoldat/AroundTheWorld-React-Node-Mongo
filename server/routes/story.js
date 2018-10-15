// models
const Story = require("../models/story");
// middlewares
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // list of users stories
  app.get("/api/story/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const stories = await Story.find({ user: userId })
        .sort({ _id: -1 })
        .populate({
          path: "user",
          select: ["email", "username"]
        });

      serverRes(res, 200, null, { stories });
    } catch (err) {
      console.log("Err: Fetch Stories", err);
      const msg = getErrMsg("err", "fetch", "stories");
      serverRes(res, 400, msg, null);
    }
  });

  // create story
  app.post("/api/story/add/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const { title, description, geometry } = req.body;

      if (!title) {
        const msg = getErrMsg("requiredFields");
        return serverRes(res, 400, msg, null);
      }

      const story = new Story({ user: userId, title, description, geometry });

      story.save();

      const msg = "Your new story has been saved";
      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: Create Story", err);
      const msg = getErrMsg("err", "create", "story");
      serverRes(res, 400, msg, null);
    }
  });
};
