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
    lat: parseFloat(getUrlParameter("lat")),
    lng: parseFloat(getUrlParameter("lng"))
  };

  // cbs & events
  moveMarker = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    this.setState({ lat, lng });
  };

  // form
  cancel = () => {
    this.props.history.push("/storyList");
  };

  submitStory = values => {
    const { lat, lng } = this.state;

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
    const { lat, lng } = this.state;
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <div>
        <Heading title="Tell your Story" />
        <div className="row">
          <div
            className="col-sm-12 col-md-7 mx-auto"
            style={{ overflow: "hidden", height: "400px" }}
          >
            <Map
              lat={lat}
              lng={lng}
              moveMarker={this.moveMarker}
              zoom={3}
              height="400px"
              width="96.5%"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-7 mx-auto">
            <div className="col-12 card p-4">
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
}

const validate = combineValidators({
  title: isRequired({ message: "The story title is a required field" })
});

export default connect(
  null,
  { startCreateStory }
)(reduxForm({ form: "createStoryForm", validate })(CreateStory));
