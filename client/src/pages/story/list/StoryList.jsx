import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
// custom components
import ListCard from "../../../components/cards/ListCard";
// actions
import {
  startGetStories,
  startMatchWithOthers
} from "../../../actions/storyActions";
// Data
const distances =
  "5,10,15,20,50,100,300,500,1000,1500,2000,2500,3000,5000,10000,100000";
const distanceArray = distances.split(",");
class StoryList extends Component {
  state = {
    distances: distanceArray
  };

  // lifecycles
  componentDidMount() {
    if (!this.props.stories) this.props.startGetStories();
  }

  // cbs & events
  tryToMatchOthers = (story, values) => {
    const matchQuery = {
      unit: values.distanceType,
      maxDistance: values.distance,
      coordinates: story.geometry.coordinates
    };

    this.props.startMatchWithOthers(matchQuery);
  };

  render() {
    const { loading, stories } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (stories && stories.length) {
      content = (
        <div className="row">
          <div className="col-12 text-center">
            {stories.map(story => (
              <ListCard
                key={story._id}
                story={story}
                distances={this.state.distances}
                tryToMatchOthers={this.tryToMatchOthers}
                isCurrentUser={true}
              />
            ))}
          </div>
        </div>
      );
    } else {
      content = (
        <div className="row">
          <div className="col-12 text-center">
            <div className="card mt-5 w-75 mx-auto">
              <div className="card-body">
                <h3>No stories found for this user</h3>
                <Link to="/map">
                  <button className="my-5 btn btn-secondary btn-sm btn-block w-75 mx-auto">
                    Create your first story?
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="storyListWrapper">
        <Heading title="Stories" />
        <div className="storiesContainer col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 mx-auto">
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ story }) => ({
  loading: story.loading,
  stories: story.stories
});

export default connect(
  mapStateToProps,
  { startGetStories, startMatchWithOthers }
)(StoryList);
