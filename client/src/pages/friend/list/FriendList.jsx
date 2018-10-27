import React from "react";
import FriendCard from "./FriendCard";

const FriendList = ({ friends, name, updateFilter, onNavigate }) => {
  const filteredFriends = friends.filter(
    friend => name === "" || friend.username.toLowerCase().includes(name)
  );

  // render dom
  const renderFriendList = () => {
    return filteredFriends.map(friend => (
      <FriendCard key={friend._id} friend={friend} onNavigate={onNavigate} />
    ));
  };

  return (
    <div>
      <div className="row py-2">
        <div className="col-sm-12 col-md-8 col-lg-7 mx-auto">
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
        <div className="d-flex flex-wrap justify-content-around">
          {renderFriendList()}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
