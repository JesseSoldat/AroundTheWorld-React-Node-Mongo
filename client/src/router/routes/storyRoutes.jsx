import React from "react";

import PrivateRoute from "../PrivateRoute";
import CreateStory from "../../pages/story/form/CreateStory";
import StoryList from "../../pages/story/list/StoryList";
import StoryDetails from "../../pages/story/details/StoryDetails";
import MatchedList from "../../pages/story/matchedList/MatchedList";
import MatchedDetails from "../../pages/story/matchedDetails/MatchedDetails";

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
    key="storyDetails"
    path="/storyDetails/:storyId"
    component={StoryDetails}
    exact
  />,
  <PrivateRoute
    key="matchedList"
    path="/matchedList"
    component={MatchedList}
    exact
  />,
  <PrivateRoute
    key="matchedDetails"
    path="/matchedDetails/:storyId"
    component={MatchedDetails}
    exact
  />
];

export default StoryRoutes;
