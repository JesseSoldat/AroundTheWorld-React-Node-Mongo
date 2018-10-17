// models
const FriendRequest = require("../models/friend");
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");
// queries
const {
  queryFriends,
  queryFriendRequests
} = require("./queries/friendsAndRequest");

module.exports = app => {
  // Get all Friends Request Sent or Received
  app.get("/api/friend/request/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const [friends, friendRequests] = await Promise.all([
        queryFriends(userId),
        queryFriendRequests(userId)
      ]);

      serverRes(res, 200, null, { friends: friends.friends, friendRequests });
    } catch (err) {
      console.log("Err: Get Friend Requests", err);
      const msg = getErrMsg("err", "fetch", "friend request");
      serverRes(res, 400, msg, null);
    }
  });

  // Send a Friends Request
};
