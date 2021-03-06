import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
// css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";

// config
import "./_config/firebase";

import AppRouter from "./router/AppRouter";
import { configureStore } from "./store/configureStore";
import handleInitialAuth from "./utils/auth/handleInitialAuth";

const store = configureStore();

const Loading = () => "";

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const root = document.getElementById("root");

let hasRenderedOnce = false;

const renderApp = () => {
  if (!hasRenderedOnce) {
    hasRenderedOnce = true;
    ReactDOM.render(jsx, root);
  }
};

ReactDOM.render(<Loading />, root);

handleInitialAuth(store, renderApp);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
