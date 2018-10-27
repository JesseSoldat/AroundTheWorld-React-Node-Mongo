import React, { Component } from "react";
import { connect } from "react-redux";
// common component
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import StaticMap from "../../map/StaticMap";
import MapCard from "../../../components/cards/MapCard";
import withStorage from "../../../components/hoc/withStorage";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
// actions
import {
  getMatchedUserStoriesRequested,
  getMatchedUserStories,
  startGetMatchedUserStories
} from "../../../actions/storyActions";

// MatchedList
class ComponentNeedingStorage extends Component {
  // lifecycles
  componentDidMount() {
    this.fetchMatchedList();
  }
  // helpers
  checkStorage = () => {
    const haveInStorage = this.props.load("matchedUser");
    if (haveInStorage) return JSON.parse(haveInStorage);
    return null;
  };

  // api calls
  fetchMatchedList = () => {
    const { userId } = this.props.match.params;
    const matchedUser = this.checkStorage();
    // check local storage
    if (matchedUser && matchedUser._id === userId) {
      const { userInfo, stories } = matchedUser;

      const username = userInfo[0].username;
      const user = { username };
      stories[0] = { ...stories[0], user };

      this.props.getMatchedUserStoriesRequested();
      this.props.getMatchedUserStories(stories, userInfo[0]);
    }
    // api call
    else this.props.startGetMatchedUserStories(userId);
  };

  // cbs & events
  viewDetails = story => {
    const { userId } = this.props.match.params;
    this.props.history.push(`/matchedDetails/${userId}/${story._id}`);
  };

  goBack = () => this.props.history.goBack();

  // render dom
  renderHeader = () => {
    const { matchedStories } = this.props;
    let title;
    if (matchedStories && matchedStories.length) {
      title = matchedStories[0].user.username + "'s Stories";
    }

    return (
      <Heading title={title}>
        <TopRowBtns btn0Cb={this.goBack} showLeftBtns={true} />
      </Heading>
    );
  };

  renderContent = () => {
    const { loading, matchedStories } = this.props;

    if (loading) return <Spinner />;
    else if (matchedStories && matchedStories.length) {
      console.log(matchedStories);
      return matchedStories.map(story => (
        <MapCard
          key={story._id}
          storyId={story._id}
          data={story}
          coordinates={story.geometry.coordinates}
          cb={this.viewDetails}
        />
      ));
    }
  };

  render() {
    const header = this.renderHeader();
    const content = this.renderContent();

    return (
      <div className="row">
        <div className="col-11 mx-auto">
          {header}

          <div className="row">
            <div className="bulletinBg col-xs-12 col-sm-11 mx-auto my-3 d-flex flex-wrap justify-content-around">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MatchedList = withStorage(ComponentNeedingStorage);

const mapStateToProps = ({ story }) => ({
  loading: story.loading,
  matchedStories: story.matchedStories
});

export default connect(
  mapStateToProps,
  {
    getMatchedUserStoriesRequested,
    getMatchedUserStories,
    startGetMatchedUserStories
  }
)(withStorage(MatchedList));
