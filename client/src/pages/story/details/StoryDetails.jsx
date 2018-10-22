import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import Accordion from "../../../components/Accordion";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
// custom components
import StaticMap from "../../map/StaticMap";
import StoryImages from "./StoryImages";
// actions
import { openModal } from "../../../actions/modalActions";
import {
  getStoryDetails,
  startGetStoryDetails
} from "../../../actions/storyActions";
import "./StoryDetails.css";

class StoryDetails extends Component {
  // lifecycles
  componentDidMount() {
    const { stories, match } = this.props;
    const { storyId } = match.params;

    let story;
    if (stories) {
      story = stories.find(story => story._id === storyId);
    }

    if (story) {
      console.log("fetch story from store");
      this.props.getStoryDetails({ story });
    } else {
      console.log("fetch story from api");
      this.props.startGetStoryDetails(storyId);
    }
  }

  componentWillUnmount() {
    this.props.getStoryDetails({ story: null });
  }

  // format data to pass to children
  formatAccordionData = details => {
    const data = {
      title1: "Story",
      title2: "Map",
      title3: "Photos",
      description: details.description,
      coordinates: details.geometry.coordinates
    };

    return data;
  };

  // cbs & events
  goBack = () => {
    this.props.history.goBack();
  };

  onDeleteStory = () => {};

  onEditStory = () => {};

  addPhotos = () => {
    const { storyId } = this.props.match.params;
    this.props.history.push(`/uploadPhotos/${storyId}`);
  };

  viewLargePhotoModal = data => {
    const { storyId } = this.props.match.params;
    this.props.openModal({
      modalType: "viewPhoto",
      data: { ...data, storyId }
    });
  };

  render() {
    const { loading, details } = this.props;

    let content;

    if (loading) content = <Spinner />;
    else if (details) {
      const data = this.formatAccordionData(details);

      content = (
        <Accordion
          data={data}
          accordionTop={<p>{data.description}</p>}
          accordionMiddle={<StaticMap coordinates={data.coordinates} />}
          accordionBottom={
            <StoryImages
              images={details.images}
              addPhotos={this.addPhotos}
              viewLargePhotoModal={this.viewLargePhotoModal}
            />
          }
        />
      );
    }

    return (
      <div className="storyDetailsWrapper">
        <Heading title="Story Details">
          <TopRowBtns
            btn0Cb={this.goBack}
            btn1Cb={this.onDeleteStory}
            btn2Cb={this.onEditStory}
            showLeftBtns={true}
            showRightBtns={true}
          />
        </Heading>
        <div className="row mt-4">
          <div className="col-xs-12 col-sm-10 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ async, story, friend, auth }) => ({
  loading: async.loading,
  stories: story.stories,
  details: story.details
});

export default connect(
  mapStateToProps,
  { getStoryDetails, startGetStoryDetails, openModal }
)(StoryDetails);
