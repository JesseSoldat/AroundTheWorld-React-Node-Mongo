import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import UserDetailsCard from "../../../components/cards/UserDetailsCard";
// actions
import { startGetProfile } from "../../../actions/profileActions";

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

    if (!profile) return <Heading />;

    if (profile)
      return <Heading title={profile.username} btn2Cb={this.editProfile} />;
  };

  renderContent = () => {
    const { loading, profile } = this.props;

    if (loading) return <Spinner />;
    else if (profile) return <UserDetailsCard details={profile} />;
  };

  render() {
    const header = this.renderHeader();
    const content = this.renderContent();

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
