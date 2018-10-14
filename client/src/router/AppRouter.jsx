import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ReduxToastr from "react-redux-toastr";
// Routes
import AuthRoutes from "./routes/authRoutes";
import GeneralRoutes from "./routes/generalRoutes";
import NavBar from "../components/NavBar";
import ScrollToTop from "../components/ScrollToTop";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <ScrollToTop>
      <NavBar />
      <ReduxToastr
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
      <Switch>
        {AuthRoutes}
        {GeneralRoutes}
      </Switch>
    </ScrollToTop>
  </Router>
);

export default AppRouter;
