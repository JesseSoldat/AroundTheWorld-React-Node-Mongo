import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
import Accordion from "../../../components/Accordion";
// custom components
import StaticMap from "../../map/StaticMap";
import StoryImages from "./StoryImages";
// actions
import { openModal } from "../../../actions/modalActions";
import { startGetStoryDetails } from "../../../actions/storyActions";

class StoryDetails extends Component {
  componentDidMount() {
    const { storyId } = this.props.match.params;
    this.props.startGetStoryDetails(storyId);
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

  addPhotos = () => {
    const { storyId } = this.props.match.params;
    this.props.history.push(`/uploadPhotos/${storyId}`);
  };

  viewLargePhotoModal = data => {
    this.props.openModal({ modalType: "viewPhoto", data });
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
        <Heading title="Story Details" />
        <div className="row mt-4">
          <div className="col-xs-12 col-sm-10 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ async, story, friend, auth }) => ({
  loading: async.loading,
  details: story.details
});

export default connect(
  mapStateToProps,
  { startGetStoryDetails, openModal }
)(StoryDetails);
