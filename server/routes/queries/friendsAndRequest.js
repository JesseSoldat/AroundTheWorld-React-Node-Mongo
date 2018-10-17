// models
const FriendRequest = require("../../models/friend");
const User = require("../../models/user");

const queryFriends = userId => {
  return User.findById(userId, { friends: 1, _id: 0 });
};

const queryFriendRequests = userId => {
  return FriendRequest.find({
    $or: [{ requester: userId }, { recipient: userId }]
  })
    .populate({
      path: "recipient",
      select: ["username"]
    })
    .populate({
      path: "requester",
      select: ["username"]
    });
};

const queryReceivedFriendRequest = (userId, friendId) => {
  return FriendRequest.findOne({
    requester: friendId,
    recipient: userId
  });
};

module.exports = {
  queryFriends,
  queryFriendRequests,
  queryReceivedFriendRequest
};
