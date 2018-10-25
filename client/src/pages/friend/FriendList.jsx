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
    <div className="bulletinBg">
      <div className="row pt-3">
        <div className="col-sm-12 col-md-8 mx-auto">
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
        {filteredFriends.map(friend => (
          <div className="col-sm-12 col-md-4 mx-auto" key={friend._id}>
            <FriendCard
              friend={friend}
              viewDetails={viewDetails}
              viewStories={viewStories}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
