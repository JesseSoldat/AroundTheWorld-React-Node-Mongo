import React from "react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
// common components
import SelectInput from "../form/SelectInput";
import RadioInput from "../form/RadioInput";
// custom components
import StaticMap from "../../pages/map/StaticMap";

const ListCard = ({
  handleSubmit,
  submitting,
  invalid,
  story,
  distances,
  tryToMatchOthers
}) => {
  const { title, description, geometry } = story;

  const matchOthers = values => tryToMatchOthers(story, values);

  return (
    <div className="card my-4">
      <div className="card-body">
        <div className="row">
          <div className="text-left col-xs-12 col-xs-12 col-md-12 col-lg-7">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{description}</p>

            <form className="form" onSubmit={handleSubmit(matchOthers)}>
              <Field
                name="distance"
                type="text"
                label="Select Distance:"
                options={distances}
                component={SelectInput}
                defaultValue="Select a distance"
              />

              <div className="radioGroup form-group">
                <Field
                  name="distanceType"
                  type="radio"
                  value="miles"
                  label="Miles"
                  component={RadioInput}
                />

                <Field
                  name="distanceType"
                  type="radio"
                  value="km"
                  label="Km"
                  component={RadioInput}
                />
              </div>

              <button
                disabled={invalid | submitting}
                type="submit"
                className="showSmBtn btn btn-primary"
              >
                Match Others
              </button>
              <button
                disabled={invalid | submitting}
                type="submit"
                className="showLgBtn btn btn-primary btn-block"
              >
                Match Others
              </button>
            </form>
          </div>

          <div className="cardImg col-xs-12 col-xs-12 col-md-12 col-lg-5">
            <StaticMap coordinates={geometry.coordinates} />
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = combineValidators({
  distance: isRequired({ message: "Please select a distance" }),
  distanceType: isRequired({ message: "Please select a distance type" })
});

export default reduxForm({
  form: "matchUsersForm",
  validate,
  initialValues: { distanceType: "miles" }
})(ListCard);
