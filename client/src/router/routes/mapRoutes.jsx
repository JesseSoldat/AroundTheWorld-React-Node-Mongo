import React from "react";

import PrivateRoute from "../PrivateRoute";
import MapIt from "../../pages/map/MapIt";

const MapRoutes = [
  <PrivateRoute key="welcome" path="/map" component={MapIt} exact />
];

export default MapRoutes;
