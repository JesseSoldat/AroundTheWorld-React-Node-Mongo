// models
const Story = require("../../models/story");

const geoMatchWithGroupAndSort = (lng, lat, maxDistance, user) =>
  Story.aggregate([
    {
      $geoNear: {
        near: [lng, lat],
        distanceField: "dist.calculated",
        maxDistance,
        spherical: true
      }
    },
    {
      $match: { user: { $ne: user } }
    },
    // $$ROOT References the top-level document, being processed in the aggregation pipeline
    { $group: { _id: "$user", stories: { $push: "$$ROOT" } } },
    {
      $project: {
        stories: 1,
        length: { $size: "$stories" }
      }
    },
    { $sort: { length: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $project: {
        length: 1,
        // username: { $userInfo: 1 },
        "userInfo.username": 1,
        "userInfo.email": 1,
        "userInfo._id": 1,
        "stories.title": 1,
        "stories.description": 1,
        "stories.geometry": 1
      }
    }
  ]);

module.exports = geoMatchWithGroupAndSort;
