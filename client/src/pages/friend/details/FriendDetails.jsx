import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Spinner from "../../../components/loading/Spinner";
import Heading from "../../../components/Heading";
import UserDetailsCard from "../../../components/cards/UserDetailsCard";
// actions
import { startGetFriendDetails } from "../../../actions/friendActions";

class FriendDetails extends Component {
  componentDidMount() {
    const { match, friendDetails } = this.props;
    const { friendId } = match.params;
    if (friendDetails && friendDetails._id === friendId) return;

    this.props.startGetFriendDetails(friendId);
  }

  // render dom
  renderHeader = () => {
    const { friendDetails } = this.props;

    if (friendDetails) return <Heading title={friendDetails.username} />;
  };

  renderContent = () => {
    const { loading, friendDetails } = this.props;

    if (loading) return <Spinner />;
    else if (friendDetails) return <UserDetailsCard details={friendDetails} />;
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

const mapStateToProps = ({ friend }) => ({
  friendDetails: friend.friendDetails
});

export default connect(
  mapStateToProps,
  { startGetFriendDetails }
)(FriendDetails);
