import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Spinner from "../../components/loading/Spinner";
import Heading from "../../components/Heading";
import NoValuesCard from "../../components/cards/NoValuesCard";
// custom components
import FriendList from "./FriendList";

// actions
import { startGetFriends } from "../../actions/friendActions";

class Friends extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.props.startGetFriends(this.props.userId);
  }

  // cbs & events
  updateFilter = e => this.setState({ name: e.target.value });

  viewStories = userId => this.props.history.push(`/matchedList/${userId}`);

  goToStoryList = () => this.props.history.push("/storyList");

  render() {
    const { loading, friends } = this.props;

    let content;

    if (loading) content = <Spinner />;
    else if (friends && friends.length >= 1) {
      content = (
        <FriendList
          friends={friends}
          name={this.state.name}
          updateFilter={this.updateFilter}
          viewStories={this.viewStories}
        />
      );
    } else {
      content = (
        <NoValuesCard
          title="No Friends"
          text="Start searching for new friends"
          btnText="Story List"
          cb={this.goToStoryList}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          <Heading title="friends" />
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, friend }) => ({
  loading: friend.loading,
  friends: friend.friends,
  userId: auth._id
});

export default connect(
  mapStateToProps,
  { startGetFriends }
)(Friends);
