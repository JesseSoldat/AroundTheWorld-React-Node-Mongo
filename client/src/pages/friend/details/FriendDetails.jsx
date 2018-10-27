import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Spinner from "../../../components/loading/Spinner";
import Heading from "../../../components/Heading";
import UserDetailsCard from "../../../components/cards/UserDetailsCard";
// actions
import {
  getFriendDetails,
  startGetFriendDetails,
  startDeleteFriend
} from "../../../actions/friendActions";

class FriendDetails extends Component {
  // lifecycles
  componentDidMount() {
    this.fetchFriendDetails();
  }

  componentWillUnmount() {
    this.props.getFriendDetails({ friendDetails: null });
  }

  // api calls
  fetchFriendDetails = () => {
    const { match, friendDetails } = this.props;
    const { friendId } = match.params;

    if (friendDetails && friendDetails._id === friendId) return;

    this.props.startGetFriendDetails(friendId);
  };

  // cbs & events
  goBackToFriendsList = () => {
    this.props.history.push("/friends");
  };

  deleteFriend = () => {
    const { friendId } = this.props.match.params;
    this.props.startDeleteFriend(friendId, this.props.history);
  };

  // render dom
  renderHeader = () => {
    const { friendDetails } = this.props;

    if (!friendDetails) return <Heading btn0Cb={this.goBackToFriendsList} />;

    if (friendDetails)
      return (
        <Heading
          title={friendDetails.username}
          btn0Cb={this.goBackToFriendsList}
          btn1Cb={this.deleteFriend}
        />
      );
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
      <div className="row px-3">
        <div className="col-sm-11 mx-auto">
          {header}
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ friend }) => ({
  loading: friend.loading,
  friendDetails: friend.friendDetails
});

export default connect(
  mapStateToProps,
  { getFriendDetails, startGetFriendDetails, startDeleteFriend }
)(FriendDetails);
