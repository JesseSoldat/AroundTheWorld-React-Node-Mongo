const checkFriendStatus = ({
  userId = "",
  matchedUserId = "",
  friendIds = [],
  friendRequests = []
}) => {
  // console.log("userId", userId);
  // console.log("matchedUserId", matchedUserId);
  // console.log("friendRequests", friendRequests);

  let status = "unknown";

  // check if they are friends
  friendIds.forEach(friendId => {
    if (matchedUserId === friendId) {
      return (status = "isFriend");
    }
  });

  // check friend requests
  friendRequests.forEach(request => {
    const { requester, recipient } = request;

    // user sent request already
    // new friends request requester && recipient will equal _id
    if (requester === userId && recipient === matchedUserId)
      return (status = "requested");
    else if (requester._id === userId && recipient._id === matchedUserId)
      return (status = "requested");
    // user received a request
    else if (requester._id === matchedUserId && recipient._id === userId)
      return (status = "received");
  });
  console.log("status", status);

  return status;
};

export default checkFriendStatus;
