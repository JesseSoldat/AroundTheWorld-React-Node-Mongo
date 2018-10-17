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
  queryFriendRequests,
  queryReceivedFriendRequest
} = require("./queries/friendsAndRequest");

module.exports = app => {
  // get all friends request sent or received
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

  // send a friends request
  app.post("/api/friend/request", isAuth, async (req, res) => {
    try {
      const { userId, friendId } = req.body;
      const friendRequest = new FriendRequest({
        requester: userId,
        recipient: friendId,
        status: "requested"
      });

      friendRequest.save();

      const msg = "Your friend request has been sent.";

      serverRes(res, 200, msg, { friendRequest });
    } catch (err) {
      console.log("Err: Friend Request", err);
      const msg = "There was an error while sending a friend request.";
      serverRes(res, 400, msg, null);
    }
  });

  // accept a friend request
  app.post("/api/friend/request/accept", isAuth, async (req, res) => {
    try {
      const { userId, friendId } = req.body;
      const friendRequest = await queryReceivedFriendRequest(userId, friendId);
      // console.log(friendRequest);

      if (!friendRequest) throw new Error();

      const [user, friend] = await Promise.all([
        User.findByIdAndUpdate(
          userId,
          { $addToSet: { friends: friendId } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          friendId,
          { $addToSet: { friends: userId } },
          { new: true }
        ),
        FriendRequest.findByIdAndRemove(friendRequest._id)
      ]);

      // console.log("user");

      // console.log(user);

      // console.log("friend");

      // console.log(friend);

      const msg = "You accepted the friend request.";

      serverRes(res, 200, msg, { user, friend });
    } catch (err) {
      console.log("Err: Accept Friend Request", err);
      const msg = "There was an error while accepting a friend request.";
      serverRes(res, 400, msg, null);
    }
  });
};
