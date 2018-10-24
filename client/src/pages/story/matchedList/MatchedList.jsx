import React, { Component } from "react";
import { connect } from "react-redux";
// common component
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import StaticMap from "../../map/StaticMap";
import ImgCard from "../../../components/cards/ImgCard";
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
  componentDidMount() {
    const { userId } = this.props.match.params;
    const matchedUser = this.checkStorage();
    if (matchedUser && matchedUser._id === userId) {
      const { userInfo, stories } = matchedUser;

      const username = userInfo[0].username;
      const user = { username };
      stories[0] = { ...stories[0], user };

      this.props.getMatchedUserStoriesRequested();
      this.props.getMatchedUserStories(stories, userInfo[0]);
    } else {
      // api call
      this.props.startGetMatchedUserStories(userId);
    }
  }

  checkStorage = () => {
    const haveInStorage = this.props.load("matchedUser");
    if (haveInStorage) {
      return JSON.parse(haveInStorage);
    }
    return null;
  };

  viewDetails = story => {
    const { userId } = this.props.match.params;
    this.props.history.push(`/matchedDetails/${userId}/${story._id}`);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { loading, matchedStories } = this.props;

    let content, title;

    if (loading) content = <Spinner />;
    else if (matchedStories) {
      if (matchedStories.length) {
        title = matchedStories[0].user.username + "'s Stories";

        content = matchedStories.map(story => (
          <ImgCard
            key={story._id}
            storyId={story._id}
            data={story}
            cb={this.viewDetails}
            image={
              <StaticMap
                coordinates={story.geometry.coordinates}
                width="100%"
                zoom={6}
              />
            }
          />
        ));
      }
    }

    return (
      <div className="row">
        <div className="col-11 mx-auto">
          <Heading title={title}>
            <TopRowBtns btn0Cb={this.goBack} showLeftBtns={true} />
          </Heading>

          <div className="row">
            <div className="col-xs-12 col-sm-11 mx-auto my-3 d-flex flex-wrap justify-content-around storiesContainer">
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
