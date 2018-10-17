const checkFriendStatus = ({
  userId = "",
  matchedUserId = "",
  friends = [],
  friendRequests = []
}) => {
  // console.log("userId", userId);
  // console.log("matchedUserId", matchedUserId);
  // console.log("checking", friendRequests);

  let status = "unknown";

  // check if they are friends
  friends.forEach(friendId => {
    if (matchedUserId === friendId) {
      return (status = "isFriend");
    }
  });

  friendRequests.forEach(request => {
    const { requester, recipient } = request;
    if (requester._id === userId && recipient._id === matchedUserId) {
      // user sent request already
      return (status = "requested");
    } else if (requester._id === matchedUserId && recipient._id === userId) {
      // user received a request
      return (status = "received");
    }
  });
  console.log("status", status);

  return status;
};

export default checkFriendStatus;
