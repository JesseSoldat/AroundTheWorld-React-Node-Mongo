import React from "react";

import PrivateRoute from "../PrivateRoute";
import Map from "../../pages/map/Map";

const MapRoutes = [
  <PrivateRoute key="welcome" path="/map" component={Map} exact />
];

export default MapRoutes;
