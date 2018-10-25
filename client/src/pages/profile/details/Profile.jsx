import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
import UserDetailsCard from "../../../components/cards/UserDetailsCard";
// actions
import { startGetProfile } from "../../../actions/profileActions";
// images
import UserAvatar from "../../../_images/userdefault.png";
// utils
import capitalizeFirstLetter from "../../../utils/stringManipulation/capitalizeFirstLetter";

class Profile extends Component {
  // lifecycles
  componentDidMount() {
    this.props.startGetProfile();
  }

  // cb & events
  editProfile = () => {
    const { userId } = this.props.match.params;
    this.props.history.push(`/updateProfile/${userId}`);
  };

  // render dom
  renderHeader = () => {
    const { profile } = this.props;

    if (profile)
      return (
        <Heading title={profile.username}>
          <TopRowBtns btn2Cb={this.editProfile} />
        </Heading>
      );
  };

  renderContent = () => {
    const { loading, profile } = this.props;

    if (loading) return <Spinner />;
    else if (profile) return <UserDetailsCard details={profile} />;
  };

  render() {
    let header = this.renderHeader();
    let content = this.renderContent();

    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          {header}
          {content}
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
)(Profile);
