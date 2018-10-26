import React, { Component } from "react";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import { Field, reduxForm } from "redux-form";
// common components
import Heading from "../../../components/Heading";
import TextInput from "../../../components/form/TextInput";
import TextArea from "../../../components/form/TextArea";
import IconBtn from "../../../components/buttons/IconBtn";
// custom components
import Map from "../../map/Map";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";
// data
import storyFields from "./helpers/storyFields";
// actions
import { startCreateStory } from "../../../actions/storyActions";

class CreateStory extends Component {
  state = {
    markerLat: 0,
    markerLng: 0,
    showMap: false
  };

  componentDidMount() {
    this.setUpState();
  }

  setUpState() {
    const lat = parseFloat(getUrlParameter("lat"));
    const lng = parseFloat(getUrlParameter("lng"));

    this.setState({
      markerLat: lat,
      markerLng: lng,
      showMap: true
    });
  }
  // map
  moveMarker = ({ lat, lng }) => {
    this.setState({ markerLat: lat, markerLng: lng });
  };

  // form
  cancel = () => {
    this.props.history.push("/storyList");
  };

  submitStory = values => {
    const { markerLat: lat, markerLng: lng } = this.state;

    const story = {
      title: values.title,
      description: values.description,
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };

    this.props.startCreateStory(story, this.props.history);
  };

  render() {
    const { showMap, markerLat, markerLng } = this.state;
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <div>
        <Heading title="Tell your Story" />
        <div className="container">
          {/* progress bar */}

          {/* google maps  */}
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
      </div>
    );
  }
}

const validate = combineValidators({
  title: isRequired({ message: "The story title is a required field" })
});

export default connect(
  null,
  { startCreateStory }
)(reduxForm({ form: "createStoryForm", validate })(CreateStory));
