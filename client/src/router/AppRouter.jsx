import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ReduxToastr from "react-redux-toastr";
// Routes
import AuthRoutes from "./routes/authRoutes";
import GeneralRoutes from "./routes/generalRoutes";
import MapRoutes from "./routes/mapRoutes";
import StoryRoutes from "./routes/storyRoutes";
// components
import NavBar from "../components/navbar/_NavBar";
import ModalManager from "../modals/ModalManager";

import ScrollToTop from "../components/ScrollToTop";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <ScrollToTop>
      <NavBar />
      <ModalManager />
      <ReduxToastr
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
      <Switch>
        {AuthRoutes}
        {GeneralRoutes}
        {MapRoutes}
        {StoryRoutes}
      </Switch>
    </ScrollToTop>
  </Router>
);

export default AppRouter;
