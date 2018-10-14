import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
// Routes
import AuthRoutes from "./routes/authRoutes";
import GeneralRoutes from "./routes/generalRoutes";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      {AuthRoutes}
      {GeneralRoutes}
    </Switch>
  </Router>
);

export default AppRouter;
