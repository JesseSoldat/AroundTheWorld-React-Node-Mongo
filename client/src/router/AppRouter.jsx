import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
// Routes
import AuthRoutes from "./routes/authRoutes";
import GeneralRoutes from "./routes/generalRoutes";
import NavBar from "../components/NavBar";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <NavBar />
      <Switch>
        {AuthRoutes}
        {GeneralRoutes}
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
