import React from "react";

import PublicRoute from "../PublicRoute";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";

const AuthRoutes = [
  <PublicRoute exact key="register" path="/register" component={Register} />,
  <PublicRoute exact key="login" path="/login" component={Login} />
];

export default AuthRoutes;
