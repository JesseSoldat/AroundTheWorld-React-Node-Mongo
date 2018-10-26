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
  if (friendIds) {
    friendIds.forEach(friendId => {
      if (matchedUserId === friendId) {
        return (status = "isFriend");
      }
    });
  }

  // check friend requests
  if (friendRequests) {
    friendRequests.forEach(request => {
      const { requester, recipient } = request;

      // -------- user sent request already --------------
      // new friends request requester && recipient will equal _id
      if (requester === userId && recipient === matchedUserId) {
        return (status = "requested");
      }
      // previous request
      else if (requester._id === userId && recipient._id === matchedUserId) {
        return (status = request.status);
      }
      // previous request user received a request
      else if (requester._id === matchedUserId && recipient._id === userId) {
        return (status =
          request.status === "requested" ? "received" : "rejected");
      }
    });
  }

  console.log("status: ", status);

  return status;
};

export default checkFriendStatus;
