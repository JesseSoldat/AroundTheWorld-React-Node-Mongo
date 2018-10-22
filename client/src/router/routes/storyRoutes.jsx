import React from "react";

import PrivateRoute from "../PrivateRoute";
import CreateStory from "../../pages/story/form/CreateStory";
import EditStory from "../../pages/story/form/EditStory";
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
    key="editStory/:storyId"
    path="/editStory/:storyId"
    component={EditStory}
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
    key="matchedList/:userId"
    path="/matchedList/:userId"
    component={MatchedList}
    exact
  />,
  <PrivateRoute
    key="matchedDetails"
    path="/matchedDetails/:userId/:storyId"
    component={MatchedDetails}
    exact
  />
];

export default StoryRoutes;
