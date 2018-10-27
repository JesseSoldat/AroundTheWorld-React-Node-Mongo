import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuth ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="publicRouteWrapper">
            <Component {...props} />
            <div className="spacer100" />
          </div>
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(mapStateToProps)(PublicRoute);
