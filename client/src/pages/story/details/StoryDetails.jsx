import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import Accordion from "../../../components/Accordion";
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

class StoryDetails extends Component {
  // lifecycles
  componentDidMount() {
    this.fetchStoryDetails();
  }

  componentWillUnmount() {
    this.props.getStoryDetails({ story: null });
  }

  // api calls
  fetchStoryDetails = () => {
    const { stories, details, match } = this.props;
    const { storyId } = match.params;
    let story;

    // the details are in the store already
    if (details && details._id === storyId) return;

    // check if the story is included in the list of stories in the store
    if (stories) story = stories.find(story => story._id === storyId);
    // found in the store
    if (story) this.props.getStoryDetails({ story });
    // not in the store fetch from the api
    else this.props.startGetStoryDetails(storyId);
  };
  // cbs & events
  goBack = () => this.props.history.push("/storyList");

  onEditStory = () => {
    const { storyId } = this.props.match.params;
    this.props.history.push(`/editStory/${storyId}`);
  };

  addPhotos = () => {
    const { storyId } = this.props.match.params;
    this.props.history.push(`/uploadPhotos/${storyId}`);
  };

  onDeleteStory = () => {
    const { storyId } = this.props.match.params;
    this.props.startDeleteStory(storyId, this.props.history);
  };

  viewLargePhotoModal = data => {
    const { storyId } = this.props.match.params;
    this.props.openModal({
      modalType: "viewPhoto",
      data: { ...data, storyId }
    });
  };

  // format data to pass to children
  formatAccordionData = details => ({
    title1: "Story",
    title2: "Map",
    title3: "Photos",
    icon1: "fas fa-atlas mr-2",
    icon2: "fas fa-map-marked-alt mr-2",
    icon3: "fas fa-images mr-2",
    description: details.description,
    coordinates: details.geometry.coordinates
  });

  // render dom
  renderHeader = () => {
    const { details } = this.props;
    const title = details ? details.title : "";

    return (
      <Heading
        title={title}
        btn0Cb={this.goBack}
        btn1Cb={this.onDeleteStory}
        btn2Cb={this.onEditStory}
      />
    );
  };

  renderContent = () => {
    const { loading, details } = this.props;

    if (loading) return <Spinner />;
    else if (details) {
      const data = this.formatAccordionData(details);

      return (
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
  };

  render() {
    const header = this.renderHeader();
    const content = this.renderContent();

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-lg-8 mx-auto">
          {header}
          {content}
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
