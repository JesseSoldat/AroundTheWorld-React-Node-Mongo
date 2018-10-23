import React from "react";

import PrivateRoute from "../PrivateRoute";
import Profile from "../../pages/profile/details/Profile";
import UpdateProfile from "../../pages/profile/form/UpdateProfile";

const ProfileRoutes = [
  <PrivateRoute
    key="profile/:userId"
    path="/profile/:userId"
    component={Profile}
    exact
  />,
  <PrivateRoute
    key="updateProfile/:userId"
    path="/updateProfile/:userId"
    component={UpdateProfile}
    exact
  />
];

export default ProfileRoutes;
