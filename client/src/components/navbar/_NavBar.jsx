import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import jLogo from "../../_images/jLogo.png";
// common components
import SiteLink from "../links/SiteLink";
// custom components
import FriendsRequestBtnGroup from "./FriendsRequestBtnGroup";
// actions
import { startLogout } from "../../actions/authActions";
import { startGetFriendRequests } from "../../actions/friendActions";
// css
import "./NavBar.module.css";

// responsive css for all of the navbar links
const navLinkClass = "nav-item mr-2 py-2 my-md-0 py-md-0";

class NavBar extends Component {
  componentDidMount() {
    const { isAuth, userId } = this.props;
    if (isAuth && userId) {
      this.props.startGetFriendRequests(userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.startGetFriendRequests(this.props.userId);
    }
  }

  onStartLogout = e => {
    e.preventDefault();
    this.props.startLogout();
  };

  getBrand = () => {
    return (
      <Link
        className="navbar-brand "
        to={this.props.isAuth ? "/dashboard" : "/"}
      >
        <img className="logo" src={jLogo} />
        <span>Around The World</span>
      </Link>
    );
  };

  getPublicRoutes = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className={`${navLinkClass} mt-2 mt-md-0`}>
          <SiteLink text="Login" icon="fa-sign-in-alt" />
        </li>
        <li className={navLinkClass}>
          <SiteLink text="Register" icon="fa-edit" />
        </li>
      </ul>
    );
  };

  getPrivateRoutes = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <FriendsRequestBtnGroup />
        <li className={navLinkClass}>
          <a onClick={e => this.onStartLogout(e)}>
            <i className="fas fa-sign-out-alt mr-2" />
            Logout
          </a>
        </li>
      </ul>
    );
  };

  render() {
    const { isAuth } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-dark site-navbar">
        {this.getBrand()}
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
          {isAuth ? this.getPrivateRoutes() : this.getPublicRoutes()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  role: auth.role,
  isAuth: !!auth._id,
  userId: auth._id
});

export default connect(
  mapStateToProps,
  { startLogout, startGetFriendRequests }
)(NavBar);
