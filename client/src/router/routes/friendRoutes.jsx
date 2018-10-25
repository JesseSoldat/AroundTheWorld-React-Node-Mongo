import React from "react";

import PrivateRoute from "../PrivateRoute";
import Friends from "../../pages/friend/_Friends";
import FriendDetails from "../../pages/friend/details/FriendDetails";

const FriendRoutes = [
  <PrivateRoute key="friends" path="/friends" component={Friends} exact />,
  <PrivateRoute
    key="friend/:friendId"
    path="/friend/:friendId"
    component={FriendDetails}
    exact
  />
];

export default FriendRoutes;
