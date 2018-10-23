import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
// actions
import { startGetProfile } from "../../../actions/profileActions";
// images
import UserAvatar from "../../../_images/userdefault.png";

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
  renderProfile = profile => {
    const { avatar } = profile;

    const defaultAvatar = avatar ? avatar : UserAvatar;
    return (
      <div className="card my-4">
        <div className="card-body">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8">{/* userinfo */}</div>
            <div className="col-xs-12 col-sm-12 col-md-4">
              <img
                style={{ maxHeight: "150px", float: "right" }}
                className="img-fluid img-thumbnail"
                src={defaultAvatar}
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, profile } = this.props;

    let content;

    if (loading) content = <Spinner />;
    else if (profile) {
      content = this.renderProfile(profile);
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-11 col-lg-8 mx-auto">
          <Heading title="Profile">
            <TopRowBtns btn2Cb={this.editProfile} />
          </Heading>
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
