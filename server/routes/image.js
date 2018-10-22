// models
const Story = require("../models/story");
// queries
// middlewares
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  app.post("/api/story/image/:storyId", isAuth, async (req, res) => {
    try {
      const { storyId } = req.params;
      const { imgObj } = req.body;

      const story = await Story.findByIdAndUpdate(
        storyId,
        { $push: { images: imgObj } },
        { new: true }
      );

      const msg = "Your image was uploaded";

      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: POST/storyImage,", err);

      const msg = getErrMsg("error", "upload", "story image");
      serverRes(res, 400, msg, null);
    }
  });

  app.delete("/api/story/image/:storyId/:imageId", isAuth, async (req, res) => {
    try {
      const { storyId, imageId } = req.params;

      const story = await Story.findByIdAndUpdate(
        storyId,
        { $pull: { images: { _id: imageId } } },
        { new: true }
      );

      const msg = "Your image was deleted";

      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: DELETE/storyImage,", err);

      const msg = getErrMsg("error", "delete", "story image");
      serverRes(res, 400, msg, null);
    }
  });
};
