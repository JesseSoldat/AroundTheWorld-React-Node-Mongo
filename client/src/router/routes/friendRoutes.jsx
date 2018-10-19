import React from "react";

import PrivateRoute from "../PrivateRoute";
import Friends from "../../pages/friend/_Friends";

const FriendRoutes = [
  <PrivateRoute key="friends" path="/friends" component={Friends} exact />
];

export default FriendRoutes;
