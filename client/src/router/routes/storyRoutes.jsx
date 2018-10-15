import React from "react";

import PrivateRoute from "../PrivateRoute";
import CreateStory from "../../pages/story/form/CreateStory";

const StoryRoutes = [
  <PrivateRoute
    key="createStory"
    path="/createStory"
    component={CreateStory}
    exact
  />
];

export default StoryRoutes;
