import React from "react";

import PrivateRoute from "../PrivateRoute";
import CreateStory from "../../pages/story/form/CreateStory";
import StoryList from "../../pages/story/list/StoryList";
import MatchedList from "../../pages/story/matchedList/MatchedList";

const StoryRoutes = [
  <PrivateRoute
    key="createStory"
    path="/createStory"
    component={CreateStory}
    exact
  />,
  <PrivateRoute
    key="storyList"
    path="/storyList"
    component={StoryList}
    exact
  />,
  <PrivateRoute
    key="matchedList"
    path="/matchedList"
    component={MatchedList}
    exact
  />
];

export default StoryRoutes;
