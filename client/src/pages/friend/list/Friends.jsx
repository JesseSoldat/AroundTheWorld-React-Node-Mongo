import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Spinner from "../../../components/loading/Spinner";
import Heading from "../../../components/Heading";
import NoValuesCard from "../../../components/cards/NoValuesCard";
// custom components
import FriendList from "./FriendList";

// actions
import { startGetFriends } from "../../../actions/friendActions";

class Friends extends Component {
  state = { name: "" };

  // lifecycles
  componentDidMount() {
    const { friends } = this.props;
    if (!friends) this.props.startGetFriends(this.props.userId);
  }

  // cbs & events
  updateFilter = e => this.setState({ name: e.target.value.toLowerCase() });

  onNavigate = url => this.props.history.push(url);

  goToStoryList = () => this.onNavigate("/storyList");

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
          onNavigate={this.onNavigate}
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
      <div className="row px-3">
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-8 mx-auto">
          <Heading title="friends" />
          <div className="bulletinBg">{content}</div>
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
