import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import NoValuesCard from "../../../components/cards/NoValuesCard";
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

  goToMap = () => this.props.history.push("/map");

  // render dom
  renderContent = () => {
    const { loading, stories } = this.props;

    if (loading) return <Spinner />;
    else if (stories && stories.length) {
      return (
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
      return (
        <NoValuesCard
          title="No Stories"
          text="Get started by click on the map and telling your story"
          btnIcon="fas fa-atlas mr-2"
          btnText="Create a story?"
          cb={this.goToMap}
        />
      );
    }
  };

  render() {
    const content = this.renderContent();
    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          <Heading title="Stories" />
          <div className="row">
            <div className="bulletinBg col-sm-11 col-md-8 mx-auto">
              {content}
            </div>
          </div>
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
