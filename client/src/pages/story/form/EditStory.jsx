import React, { Component } from "react";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import { Field, reduxForm } from "redux-form";
// common components
import Spinner from "../../../components/loading/Spinner";
import TextInput from "../../../components/form/TextInput";
import TextArea from "../../../components/form/TextArea";
import IconBtn from "../../../components/buttons/IconBtn";
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
    lat: 0,
    lng: 0,
    showMap: false
  };

  // lifecycles
  componentDidMount() {
    this.fetchStoryDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.showMap) {
      const { details } = this.props;
      if (details && details.geometry) {
        const { coordinates } = details.geometry;
        this.setState({
          lat: coordinates[1],
          lng: coordinates[0],
          showMap: true
        });
      }
    }
  }

  // api calls
  fetchStoryDetails = () => {
    const { match, stories } = this.props;
    const { storyId } = match.params;

    let story;

    // stories is stored in the store
    if (stories) {
      story = stories.find(story => story._id === storyId);
      this.props.getStoryDetails({ story });
    }
    // fetch from the api
    else this.props.startGetStoryDetails(storyId);
  };

  // cbs & events
  moveMarker = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    this.setState({ lat, lng });
  };

  submitStory = values => {
    const { storyId } = this.props.match.params;
    const { lat, lng } = this.state;

    const story = {
      title: values.title,
      description: values.description,
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };

    this.props.startEditStory(storyId, story, this.props.history);
  };

  cancel = () => this.props.history.push("/storyList");

  // render dom
  renderContent = () => {
    const {
      loading,
      initialValues,
      handleSubmit,
      invalid,
      submitting
    } = this.props;
    const { lat, lng, showMap } = this.state;

    if (loading) return <Spinner />;
    else if (initialValues) {
      return (
        <div>
          <div className="row">
            <div
              className="col-sm-12 col-md-7 mx-auto"
              style={{ overflow: "hidden", height: "400px" }}
            >
              {showMap && (
                <Map
                  lat={lat}
                  lng={lng}
                  moveMarker={this.moveMarker}
                  zoom={5}
                  height="400px"
                  width="96.5%"
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-7 mx-auto">
              <div className="card p-4">
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
                      <IconBtn
                        btnClass="btn btn-danger mr-2"
                        iconClass="fas fa-backspace"
                        text="Cancel"
                        cb={this.cancel}
                      />
                      <IconBtn
                        btnClass="btn btn-secondary"
                        iconClass="fas fa-check"
                        text="Submit"
                        type="submit"
                        disabled={invalid || submitting}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div className="mt-3">{this.renderContent()}</div>;
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
