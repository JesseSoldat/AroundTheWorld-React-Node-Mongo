import React from "react";
import { connect } from "react-redux";

// common components
import SiteLink from "./links/SiteLink";

const NavBar = ({ isAuth }) => {
  const brand = (
    <SiteLink
      text="Around The World"
      url={isAuth ? "/dashboard" : "/"}
      linkCss="navbar-brand text-light"
    />
  );

  // responsive css for all of the navbar links
  const navLinkClass = "nav-item mr-2 py-2 my-md-0 py-md-0";

  const publicRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className={`${navLinkClass} mt-2 mt-md-0`}>
        <SiteLink text="Login" icon="fa-sign-in-alt" />
      </li>
      <li className={navLinkClass}>
        <SiteLink text="Register" icon="fa-edit" />
      </li>
    </ul>
  );

  const privateRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className={navLinkClass}>
        <a href="" onClick={e => onStartLogout(e)}>
          <i className="fas fa-sign-out-alt mr-2" />
          Logout
        </a>
      </li>
    </ul>
  );

  const onStartLogout = e => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light text-light bg-dark site-navbar">
      {brand}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mobile"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="mobile">
        <ul className="navbar-nav mr-auto" />
        {isAuth ? privateRoutes : publicRoutes}
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({
  role: auth.role,
  isAuth: !!auth._id
});

export default connect(
  mapStateToProps,
  {}
)(NavBar);
