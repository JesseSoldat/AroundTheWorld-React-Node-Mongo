import React from "react";

import PublicRoute from "../PublicRoute";
import PrivateRoute from "../PrivateRoute";
import Welcome from "../../pages/general/Welcome";
import Dashboard from "../../pages/general/Dashboard";

const GeneralRoutes = [
  <PublicRoute key="welcome" path="/" component={Welcome} exact />,
  <PrivateRoute key="dashboard" path="/dashboard" component={Dashboard} exact />
];

export default GeneralRoutes;
