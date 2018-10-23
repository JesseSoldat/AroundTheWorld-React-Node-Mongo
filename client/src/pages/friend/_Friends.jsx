import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Spinner from "../../components/loading/Spinner";
import Heading from "../../components/Heading";
// custom components
import FriendCard from "./FriendCard";
// actions
import { startGetFriends } from "../../actions/friendActions";

class Friends extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.props.startGetFriends(this.props.userId);
  }

  viewStories = userId => this.props.history.push(`/matchedList/${userId}`);

  updateFilter = e => this.setState({ name: e.target.value });

  filterFriends = friends => {
    const { name } = this.state;
    return friends.filter(
      friend => name === "" || friend.username.includes(name)
    );
  };

  renderFriendsList = friends => {
    const filteredFriends = this.filterFriends(friends);

    return (
      <div>
        <div className="row">
          <div className="col-12">
            {friends.length > 1 && (
              <input
                placeholder="Search for a friend by name..."
                type="text"
                value={this.state.name}
                onChange={this.updateFilter}
                className="form-control"
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {filteredFriends.map(friend => (
              <FriendCard
                key={friend._id}
                friend={friend}
                viewStories={this.viewStories}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, friends } = this.props;

    let content;

    if (loading) content = <Spinner />;
    else if (friends) {
      content = this.renderFriendsList(friends);
    }
    return (
      <div className="container">
        <Heading title="friends" />
        {content}
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
