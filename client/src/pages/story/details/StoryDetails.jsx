import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import Accordion from "../../../components/Accordion";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
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
    const { stories, details, match } = this.props;
    const { storyId } = match.params;
    let story;

    if (details && details._id === storyId) {
      console.log("have details", details);
      return;
    }

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

  onEditStory = () => {
    const { storyId } = this.props.match.params;
    this.props.history.push(`/editStory/${storyId}`);
  };

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
      icon1: "fas fa-atlas mr-2",
      icon2: "fas fa-map-marked-alt mr-2",
      icon3: "fas fa-images mr-2",
      description: details.description,
      coordinates: details.geometry.coordinates
    };

    return data;
  };

  render() {
    const { loading, details } = this.props;

    let content, title;

    if (loading) content = <Spinner />;
    else if (details) {
      title = details.title;
      const data = this.formatAccordionData(details);

      content = (
        <Accordion
          data={data}
          accordionTop={<p>{data.description}</p>}
          accordionMiddle={
            <div style={{ overflow: "hidden", height: "400px" }}>
              <Map
                lat={data.coordinates[1]}
                lng={data.coordinates[0]}
                zoom={8}
                height="400px"
                width="95%"
              />
            </div>
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
      <div className="row">
        <div className="col-11 mx-auto">
          <Heading title={title}>
            <TopRowBtns
              btn0Cb={this.goBack}
              btn1Cb={this.onDeleteStory}
              btn2Cb={this.onEditStory}
            />
          </Heading>
          <div className="row mt-4">
            <div className="col-xs-12 col-sm-10 mx-auto">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ story }) => ({
  loading: story.loading,
  stories: story.stories,
  details: story.details
});

export default connect(
  mapStateToProps,
  { getStoryDetails, startGetStoryDetails, startDeleteStory, openModal }
)(StoryDetails);
