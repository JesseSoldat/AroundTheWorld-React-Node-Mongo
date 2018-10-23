import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
// custom components
import BasicForm from "./components/BasicForm";
// actions
import { startGetProfile } from "../../../actions/profileActions";
// images
import UserAvatar from "../../../_images/userdefault.png";

class UpdateProfile extends Component {
  componentDidMount() {
    const { profile, match } = this.props;
    const { userId } = match.params;
    if (profile && profile._id === userId) return;

    this.props.startGetProfile(userId);
  }

  // cbs & events
  goBack = () => {};

  // render dom
  renderSideBar = () => {
    return (
      <div className="col-xs-12 col-md-4 mx-auto mb-2">
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              <li className="list-group-item bg-secondary text-light">
                <i className="fas fa-cogs mr-2" />
                Profile
              </li>
              <button
                type="button"
                className="list-group-item list-group-item-action"
              >
                Basics
              </button>
              <button
                type="button"
                className="list-group-item list-group-item-action"
              >
                About Me
              </button>
              <button
                type="button"
                className="list-group-item list-group-item-action"
              >
                Avatar
              </button>
              <button
                type="button"
                className="list-group-item list-group-item-action"
              >
                Password
              </button>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, profile, match } = this.props;
    const { userId } = match.params;
    let content, sideBar;

    if (loading) content = <Spinner />;
    else if (profile && profile._id === userId) {
      content = <BasicForm profile={profile} />;
      sideBar = this.renderSideBar();
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-11 col-lg-8 mx-auto">
          <Heading title="Update Profile">
            <TopRowBtns btn0Cb={this.goBack} />
          </Heading>
          <div className="row mt-5">
            {sideBar}
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  loading: profile.loading,
  profile: profile.profile
});

export default connect(
  mapStateToProps,
  { startGetProfile }
)(UpdateProfile);
