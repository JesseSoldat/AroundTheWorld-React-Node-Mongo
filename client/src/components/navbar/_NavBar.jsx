import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
  viewFriends = () => {
    this.props.history.push("/friends");
  };

  viewProfile = () => this.props.history.push(`/profile/${this.props.userId}`);

  acceptFriendRequest = () => {
    // display a modal with request
  };

  onStartLogout = () => {
    this.props.startLogout();
  };

  // render dom elements
  getBrand = () => {
    return (
      <Link
        className="navbar-brand ml-3"
        to={this.props.userId ? "/dashboard" : "/"}
      >
        <img className="logo" src={jLogo} />
        <span>Around The World</span>
      </Link>
    );
  };

  getPublicRoutes = () => {
    return (
      <ul className="navbar-nav ml-auto mr-3">
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
      <ul className="navbar-nav ml-auto mr-3">
        <ShowHide size={"sm"}>
          <FriendsRequestListItem
            numberOfRequests={numberOfRequests}
            viewFriends={this.viewFriends}
            acceptFriendRequest={this.acceptFriendRequest}
            viewProfile={this.viewProfile}
          />
        </ShowHide>

        <li className={`${navLinkClass} mr-3`}>
          <SiteLink text="MapIt" icon="fas fa-map" />
        </li>

        <li className={`${navLinkClass} mr-3`}>
          <SiteLink text="Stories" icon="fas fa-atlas" />
        </li>

        <ShowHide size={"sm"}>
          <li className="nav-item">
            <a onClick={e => this.onStartLogout(e)}>
              <i className="fas fa-sign-out-alt py-2 mr-2" />
              Logout
            </a>
          </li>
        </ShowHide>

        <ShowHide size={"md"}>
          <FriendsRequestBtnGroup
            numberOfRequests={numberOfRequests}
            viewFriends={this.viewFriends}
            acceptFriendRequest={this.acceptFriendRequest}
            viewProfile={this.viewProfile}
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
)(withRouter(NavBar));
