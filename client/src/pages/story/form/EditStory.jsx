import React, { Component } from "react";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import { Field, reduxForm } from "redux-form";
// common components
import Heading from "../../../components/Heading";
import OverlaySpinner from "../../../components/loading/OverlaySpinner";
import Spinner from "../../../components/loading/Spinner";
import TextInput from "../../../components/form/TextInput";
import TextArea from "../../../components/form/TextArea";
// custom components
import Map from "../../map/Map";
// data
import storyFields from "./helpers/storyFields";
// actions
import {
  startGetStoryDetails,
  getStoryDetails,
  startEditStory
} from "../../../actions/storyActions";

class EditStory extends Component {
  state = {
    markerLat: 0,
    markerLng: 0,
    showMap: false
  };

  componentDidMount() {
    const { match, stories } = this.props;
    const { storyId } = match.params;

    let story;
    if (stories) {
      story = stories.find(story => story._id === storyId);
      console.log("story", story);
      this.getStoryDetails({ story });
    } else {
      console.log("fetch story from api");
      this.props.startGetStoryDetails(storyId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.showMap) {
      const { details } = this.props;
      if (details && details.geometry) {
        const { coordinates } = details.geometry;
        this.setState({
          showMap: true,
          markerLat: coordinates[1],
          markerLng: coordinates[0]
        });
      }
    }
  }

  // map
  moveMarker = ({ lat, lng, x, y }) => {
    this.setState({ markerLat: lat, markerLng: lng });
  };

  submitStory = () => {};

  cancel = () => {
    this.props.history.push("/storyList");
  };

  renderContent = () => {
    const { showMap, markerLat, markerLng } = this.state;
    const { handleSubmit, invalid, submitting } = this.props;
    return (
      <div className="container">
        <div className="mapContainer">
          <div className="row">
            <div className="col-xs-12 col-sm-11 mx-auto">
              <div>
                {showMap && (
                  <Map
                    map={{ lat: markerLat, lng: markerLng }}
                    marker={{ markerLat, markerLng }}
                    moveMarker={this.moveMarker}
                    height="400px"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-11 mx-auto">
              <div className="card p-3">
                <div className="card-block">
                  <h3 className="card-title styles.storyCard">Story Details</h3>
                  <form onSubmit={handleSubmit(this.submitStory)}>
                    <Field
                      fieldObj={storyFields["title"]}
                      name={storyFields["title"].name}
                      type={storyFields["title"].type}
                      component={TextInput}
                    />
                    <div className="spacer10" />
                    <Field
                      fieldObj={storyFields["description"]}
                      name={storyFields["description"].name}
                      type={storyFields["description"].type}
                      component={TextArea}
                    />
                    <div className="spacer10" />
                    <div>
                      <button
                        className="btn btn-primary mr-2"
                        type="submit"
                        disabled={invalid || submitting}
                      >
                        Submit
                      </button>
                      <button onClick={this.cancel} className="btn btn-danger">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    // const { showMap, markerLat, markerLng } = this.state;
    const { loading, initialValues } = this.props;
    let content;
    if (loading) content = <Spinner />;
    else if (initialValues) {
      content = this.renderContent();
    }

    return (
      <div>
        <OverlaySpinner showOverlay={this.props.showOverlay} />
        <Heading title="Edit Story" />
        {content}
      </div>
    );
  }
}

const validate = combineValidators({
  title: isRequired({ message: "The story title is a required field" })
});

const mapStateToProps = ({ story }) => {
  const title = (story.details && story.details.title) || "";
  const description = (story.details && story.details.description) || "";

  const initialValues = { title, description };

  return {
    loading: story.loading,
    showOverlay: story.overlay,
    stories: story.stories,
    details: story.details,
    initialValues
  };
};

export default connect(
  mapStateToProps,
  { getStoryDetails, startGetStoryDetails, startEditStory }
)(
  reduxForm({ form: "editStoryForm", enableReinitialize: true, validate })(
    EditStory
  )
);
