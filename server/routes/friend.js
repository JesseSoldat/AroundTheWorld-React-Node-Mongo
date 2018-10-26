// models
const FriendRequest = require("../models/friend");
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");
// queries
const {
  queryAllFriends,
  queryFriendIds,
  queryFriendRequests,
  queryReceivedFriendRequest
} = require("./queries/friendsAndRequest");

module.exports = app => {
  // get all friends
  app.get("/api/friends/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const friends = await queryAllFriends(userId);

      serverRes(res, 200, null, { friends: friends.friends });
    } catch (err) {
      console.log("Err: Get Friends", err);
      const msg = getErrMsg("err", "fetch", "friends");
      serverRes(res, 400, msg, null);
    }
  });

  // get friend details
  app.get("/api/friendDetails/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;

      const friendDetails = await User.findById(userId, {
        password: 0,
        role: 0,
        friends: 0,
        createdAt: 0,
        updatedAt: 0
      });

      serverRes(res, 200, null, { friendDetails });
    } catch (err) {
      console.log("Err get friend details", err);
      const msg = getErrMsg("err", "fetch", "friend details");
      serverRes(res, 401, msg, null);
    }
  });

  // get all friends request sent or received
  app.get("/api/friend/request/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;
      const [friends, friendRequests] = await Promise.all([
        queryFriendIds(userId),
        queryFriendRequests(userId)
      ]);

      serverRes(res, 200, null, { friendIds: friends.friends, friendRequests });
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
      const friendRequestId = friendRequest._id;

      if (!friendRequest) throw new Error();

      const [user, friend] = await Promise.all([
        User.findByIdAndUpdate(
          userId,
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate({
          path: "friends",
          select: ["username", "avatar"]
        }),
        User.findByIdAndUpdate(
          friendId,
          { $addToSet: { friends: userId } },
          { new: true }
        ),
        FriendRequest.findByIdAndRemove(friendRequest._id)
      ]);

      // console.log("friendId", friendId);
      // console.log("friends", user.friends);
      // console.log("friendRequest id", friendRequestId);

      const msg = "You have accepted the friend request.";

      serverRes(res, 200, msg, {
        friends: user.friends,
        friendId,
        friendRequestId
      });
    } catch (err) {
      console.log("Err: Accept Friend Request", err);
      const msg = "There was an error while accepting a friend request.";
      serverRes(res, 400, msg, null);
    }
  });

  // deny a friend request
  app.post("/api/friend/request/deny", isAuth, async (req, res) => {
    try {
      const { userId, friendId } = req.body;

      const friendRequest = await FriendRequest.findOneAndUpdate(
        {
          requester: friendId,
          recipient: userId
        },
        { $set: { status: "rejected" } },
        { new: true }
      );

      const msg = "Friend request has been rejected";

      serverRes(res, 200, msg, { friendRequestId: friendRequest._id });
    } catch (err) {
      console.log("Err: Deny Friend Request", err);
      const msg = "There was an error while denying a friend request.";
      serverRes(res, 400, msg, null);
    }
  });
};
