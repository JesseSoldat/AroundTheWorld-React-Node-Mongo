import React from "react";
import FriendCard from "./FriendCard";

const FriendList = ({ friends, name, updateFilter, onNavigate }) => {
  const filteredFriends = friends.filter(
    friend => name === "" || friend.username.toLowerCase().includes(name)
  );

  // render dom
  const renderFriendList = () => {
    return filteredFriends.map(friend => (
      <div className="col-sm-12 col-md-6 col-lg-4 mx-auto" key={friend._id}>
        <FriendCard friend={friend} onNavigate={onNavigate} />
      </div>
    ));
  };

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
      <div className="row">{renderFriendList()}</div>
    </div>
  );
};

export default FriendList;
