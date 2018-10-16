import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween
} from "revalidate";
// common components
import SelectInput from "../form/SelectInput";
import RadioInput from "../form/RadioInput";

const ListCard = ({ handleSubmit, submitting, invalid, story, distances }) => {
  const { title, description } = story;

  const matchUsers = values => {
    console.log(values);
  };

  return (
    <div className="card my-4">
      <div className="card-body">
        <div className="row">
          <div className="text-left col-xs-12 col-xs-12 col-md-12 col-lg-7">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{description}</p>

            <form className="form" onSubmit={handleSubmit(matchUsers)}>
              <Field
                name="distance"
                type="text"
                label="Select Distance:"
                options={distances}
                component={SelectInput}
                defaultText="Select a distance"
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
                disabled={invalid || submitting}
                type="submit"
                className="showSmBtn btn btn-primary"
              >
                Match Others
              </button>
              <button
                disabled={invalid || submitting}
                type="submit"
                className="showLgBtn btn btn-primary btn-block"
              >
                Match Others
              </button>
            </form>
          </div>

          <div className="cardImg col-xs-12 col-xs-12 col-md-12 col-lg-5">
            <img src="https://via.placeholder.com/150x150" />
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

export default reduxForm({ form: "matchUsersForm", validate })(ListCard);
