const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// models
const Story = require("../models/story");
// queries
const geoMatchWithGroupAndSort = require("./queries/geoMatchOthers");
// middlewares
const isAuth = require("../middleware/isAuth");
// helpers
const convertToRadiansFromMilesOrKm = require("./helpers/convertToRadiansFromMilesOrKm");
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

  // get a single story details
  app.get("/api/story/details/:storyId", isAuth, async (req, res) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findById(storyId).populate({
        path: "user",
        select: ["email", "username"]
      });

      serverRes(res, 200, null, { story });
    } catch (err) {
      console.log("Err: Fetch Story", err);
      const msg = getErrMsg("err", "fetch", "story");
      serverRes(res, 400, msg, null);
    }
  });

  // create a story
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

  app.put("/api/story/edit/:storyId", isAuth, async (req, res) => {
    try {
      const { storyId } = req.params;
      const { title, description, geometry } = req.body.updatedStory;

      if (!title) {
        const msg = getErrMsg("requiredFields");
        return serverRes(res, 400, msg, null);
      }

      const story = await Story.findByIdAndUpdate(
        storyId,
        {
          $set: { title, description, geometry }
        },
        { new: true }
      );

      const msg = "Your story has been updated";
      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: Edit Story", err);
      const msg = getErrMsg("err", "edit", "story");
      serverRes(res, 400, msg, null);
    }
  });

  // delete a story
  app.delete("/api/story/delete/:storyId", isAuth, async (req, res) => {
    try {
      const { storyId } = req.params;

      const story = await Story.findByIdAndDelete(storyId);

      const msg = "The story was deleted";

      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: Delete Story", err);
      const msg = getErrMsg("err", "delete", "story");
      serverRes(res, 400, msg, null);
    }
  });

  // find users with stories close to your story
  app.get("/api/story/match/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;

      const user = new ObjectId(userId);
      const maxDistance = convertToRadiansFromMilesOrKm(req.query);

      const lng = parseFloat(req.query.lng);
      const lat = parseFloat(req.query.lat);

      const match = await geoMatchWithGroupAndSort(lng, lat, maxDistance, user);

      serverRes(res, 200, null, { match });
    } catch (err) {
      console.log("Err: Match Location", err);
      const msg = getErrMsg("err", "match", "other users");
      serverRes(res, 400, msg, null);
    }
  });
};
