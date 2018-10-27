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
import AvatarForm from "./components/AvatarForm";
import PasswordForm from "./components/PasswordForm";
// actions
import {
  startGetProfile,
  startEditProfile,
  resetField
} from "../../../actions/profileActions";
import { startChangePassword } from "../../../actions/authActions";

class UpdateProfile extends Component {
  state = {
    currentForm: "basic"
  };

  // lifecycles
  componentDidMount() {
    this.getUserProfile();
  }

  // api calls
  getUserProfile = () => {
    const { profile, match } = this.props;
    const { userId } = match.params;
    if (profile && profile._id === userId) return;

    this.props.startGetProfile(userId);
  };

  // cbs & events
  resetFieldOnForm = () =>
    this.props.resetField("birthDate", null, "profileForm");

  changeCurrentForm = formType => this.setState({ currentForm: formType });

  updateProfile = values =>
    this.props.startEditProfile({ ...this.props.profile, ...values });

  updatePassword = values => this.props.startChangePassword(values.password);

  goBack = () => {
    const { history, match } = this.props;
    history.push(`/profile/${match.params.userId}`);
  };

  // render dom
  renderCurrentForm = (currentForm, profile) => {
    switch (currentForm) {
      case "basic":
        return (
          <BasicForm
            initialValues={profile}
            updateProfile={this.updateProfile}
            resetFieldOnForm={this.resetFieldOnForm}
          />
        );

      case "about":
        return (
          <AboutForm
            initialValues={profile}
            updateProfile={this.updateProfile}
          />
        );

      case "avatar":
        return (
          <AvatarForm
            initialValues={profile}
            updateProfile={this.updateProfile}
          />
        );

      case "password":
        return <PasswordForm updatePassword={this.updatePassword} />;

      default:
        break;
    }
  };

  renderContent = () => {
    const { loading, profile, match } = this.props;
    const { userId } = match.params;

    if (loading) return <Spinner />;
    else if (profile && profile._id === userId) {
      return this.renderCurrentForm(this.state.currentForm, profile);
    }
  };

  renderSideBar = () => {
    if (this.props.loading) return;

    return (
      <SideBar
        currentForm={this.state.currentForm}
        changeCurrentForm={this.changeCurrentForm}
      />
    );
  };

  render() {
    const content = this.renderContent();
    const sideBar = this.renderSideBar();

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-11 col-lg-10 mx-auto">
          <Heading title="Update Profile" btn0Cb={this.goBack} />

          <div className="row mt-5 mx-2">
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
  { resetField, startGetProfile, startEditProfile, startChangePassword }
)(UpdateProfile);
