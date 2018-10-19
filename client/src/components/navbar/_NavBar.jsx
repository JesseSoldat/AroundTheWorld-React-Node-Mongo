import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import jLogo from "../../_images/jLogo.png";
// common components
import SiteLink from "../links/SiteLink";
// custom components
import ShowHide from "../ShowHide";
import FriendsRequestBtnGroup from "./FriendsRequestBtnGroup";
import FriendsRequestListItem from "./FriendsRequestListItem";
// actions
import { startLogout } from "../../actions/authActions";
import { startGetFriendRequests } from "../../actions/friendActions";
// css
import "./NavBar.css";

// responsive css for all of the navbar links
const navLinkClass = "nav-item mr-2 py-2 my-md-0 py-md-0";

class NavBar extends Component {
  // lifecycles
  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.props.startGetFriendRequests(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (userId !== prevProps.userId) {
      if (userId) {
        this.props.startGetFriendRequests(this.props.userId);
      }
    }
  }

  // cbs and events
  viewFriends = () => {};

  acceptFriendRequest = () => {
    console.log("friend");
  };

  onStartLogout = e => {
    // e.preventDefault();
    this.props.startLogout();
  };

  // render dom elements
  getBrand = () => {
    return (
      <Link
        className="navbar-brand "
        to={this.props.userId ? "/dashboard" : "/"}
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
          <SiteLink text="Login" icon="fas fa-sign-in-alt" />
        </li>
        <li className={navLinkClass}>
          <SiteLink text="Register" icon="fas fa-edit" />
        </li>
      </ul>
    );
  };

  getPrivateRoutes = () => {
    const { numberOfRequests } = this.props;
    return (
      <ul className="navbar-nav ml-auto">
        <ShowHide size={"sm"}>
          <FriendsRequestListItem
            numberOfRequests={0}
            viewFriends={this.viewFriends}
            acceptFriendRequest={this.acceptFriendRequest}
          />

          <li className="nav-item">
            <a onClick={e => this.onStartLogout(e)}>
              <i className="fas fa-sign-out-alt my-3 mr-2" />
              Logout
            </a>
          </li>
        </ShowHide>

        <ShowHide size={"md"}>
          <FriendsRequestBtnGroup
            numberOfRequests={0}
            viewFriends={this.viewFriends}
            acceptFriendRequest={this.acceptFriendRequest}
            logout={this.onStartLogout}
          />
        </ShowHide>
      </ul>
    );
  };

  render() {
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
          {this.props.userId ? this.getPrivateRoutes() : this.getPublicRoutes()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, friend }) => {
  const numberOfRequests = friend.friendRequest
    ? friend.friendRequest.length
    : 0;

  return {
    role: auth.role,
    userId: auth._id,
    numberOfRequests
  };
};

export default connect(
  mapStateToProps,
  { startLogout, startGetFriendRequests }
)(NavBar);
