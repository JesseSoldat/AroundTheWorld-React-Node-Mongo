import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import Accordion from "../../../components/Accordion";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
import OverlaySpinner from "../../../components/loading/OverlaySpinner";
// custom components
import StoryImages from "./StoryImages";
import Map from "../../map/Map";
// actions
import { openModal } from "../../../actions/modalActions";
import {
  getStoryDetails,
  startGetStoryDetails,
  startDeleteStory
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

  // cbs & events
  goBack = () => {
    this.props.history.push("/storyList");
  };

  onDeleteStory = () => {
    const { storyId } = this.props.match.params;
    this.props.startDeleteStory(storyId, this.props.history);
  };

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

  render() {
    const { loading, details } = this.props;

    let content;

    if (loading) content = <Spinner />;
    else if (details) {
      const data = this.formatAccordionData(details);
      console.log(data);

      content = (
        <Accordion
          data={data}
          accordionTop={<p>{data.description}</p>}
          accordionMiddle={
            <Map
              map={[data.coordinates[1], data.coordinates[0]]}
              height="400px"
              marker={{
                markerLng: data.coordinates[0],
                markerLat: data.coordinates[1]
              }}
            />
          }
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
        <OverlaySpinner showOverlay={this.props.showOverlay} />
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

const mapStateToProps = ({ story }) => ({
  showOverlay: story.overlay,
  loading: story.loading,
  stories: story.stories,
  details: story.details
});

export default connect(
  mapStateToProps,
  { getStoryDetails, startGetStoryDetails, startDeleteStory, openModal }
)(StoryDetails);
