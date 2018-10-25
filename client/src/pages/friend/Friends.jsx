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
    const { friends } = this.props;
    if (!friends) this.props.startGetFriends(this.props.userId);
  }

  // cbs & events
  updateFilter = e => this.setState({ name: e.target.value });

  viewDetails = userId => this.props.history.push(`/friend/${userId}`);

  viewStories = userId => this.props.history.push(`/matchedList/${userId}`);

  goToStoryList = () => this.props.history.push("/storyList");

  // render dom
  renderContent = () => {
    const { loading, friends } = this.props;

    // loading
    if (loading) return <Spinner />;
    // have friends
    else if (friends && friends.length >= 1)
      return (
        <FriendList
          friends={friends}
          name={this.state.name}
          updateFilter={this.updateFilter}
          viewDetails={this.viewDetails}
          viewStories={this.viewStories}
        />
      );
    // no friends
    else
      return (
        <NoValuesCard
          title="No Friends"
          text="Start searching for new friends"
          btnText="Story List"
          btnIcon="fas fa-atlas mr-2"
          cb={this.goToStoryList}
        />
      );
  };

  render() {
    let content = this.renderContent();

    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          <Heading title="friends" />
          <div className="row">
            <div className="bulletinBg col-sm-11 mx-auto">{content}</div>
          </div>
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
