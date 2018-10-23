import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
// custom components
import SideBar from "./components/SideBar";
import BasicForm from "./components/BasicForm";
import AboutForm from "./components/AboutForm";
// actions
import {
  startGetProfile,
  startEditProfile
} from "../../../actions/profileActions";
// images
import UserAvatar from "../../../_images/userdefault.png";

class UpdateProfile extends Component {
  state = {
    currentForm: "basic"
  };

  componentDidMount() {
    const { profile, match } = this.props;
    const { userId } = match.params;
    if (profile && profile._id === userId) return;

    this.props.startGetProfile(userId);
  }

  // cbs & events
  changeCurrentForm = formType => {
    this.setState({ currentForm: formType });
  };

  updateProfile = values => {
    const { profile } = this.props;
    console.log(values);
    this.props.startEditProfile({ ...profile, ...values });
  };

  goBack = () => {};

  renderCurrentForm = (currentForm, profile) => {
    console.log(profile);

    switch (currentForm) {
      case "basic":
        return (
          <BasicForm
            initialValues={profile}
            updateProfile={this.updateProfile}
          />
        );

      case "about":
        return (
          <AboutForm
            initialValues={profile}
            updateProfile={this.updateProfile}
          />
        );

      default:
        break;
    }
  };

  render() {
    const { loading, profile, match } = this.props;
    const { userId } = match.params;
    const { currentForm } = this.state;
    let content, sideBar;

    if (loading) content = <Spinner />;
    else if (profile && profile._id === userId) {
      content = this.renderCurrentForm(currentForm, profile);

      sideBar = (
        <SideBar
          currentForm={this.state.currentForm}
          changeCurrentForm={this.changeCurrentForm}
        />
      );
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
  { startGetProfile, startEditProfile }
)(UpdateProfile);
