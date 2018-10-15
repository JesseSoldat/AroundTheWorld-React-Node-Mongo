import React from "react";

import PrivateRoute from "../PrivateRoute";
import CreateStory from "../../pages/story/form/CreateStory";
import StoryList from "../../pages/story/list/StoryList";

const StoryRoutes = [
  <PrivateRoute
    key="createStory"
    path="/createStory"
    component={CreateStory}
    exact
  />,
  <PrivateRoute key="storyList" path="/storyList" component={StoryList} exact />
];

export default StoryRoutes;
