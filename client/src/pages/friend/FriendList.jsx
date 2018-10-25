import React from "react";
import FriendCard from "./FriendCard";

const FriendList = ({
  friends,
  name,
  updateFilter,
  viewDetails,
  viewStories
}) => {
  const filteredFriends = friends.filter(
    friend => name === "" || friend.username.includes(name)
  );

  return (
    <div>
      <div className="row">
        <div className="col-12">
          {friends.length > 1 && (
            <input
              placeholder="Search for a friend by name..."
              type="text"
              value={name}
              onChange={updateFilter}
              className="form-control"
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {filteredFriends.map(friend => (
            <FriendCard
              key={friend._id}
              friend={friend}
              viewDetails={viewDetails}
              viewStories={viewStories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
