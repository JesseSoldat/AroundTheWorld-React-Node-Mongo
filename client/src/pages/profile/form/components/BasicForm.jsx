import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween
} from "revalidate";
// common components
import TextInput from "../../../../components/form/TextInput";
import RadioInput from "../../../../components/form/RadioInput";
import DateInput from "../../../../components/form/DateInput";
// data
import profileFields from "../helpers/profileFields";

const BasicForm = ({
  resetFieldOnForm,
  submitting,
  invalid,
  handleSubmit,
  updateProfile
}) => {
  // cbs & events
  const resetInputValue = () => {
    resetFieldOnForm();
  };

  return (
    <div className="col-xs-12 col-md-8 mx-auto">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h4>Basics</h4>
              <form onSubmit={handleSubmit(updateProfile)}>
                <Field
                  fieldObj={profileFields["username"]}
                  name={profileFields["username"].name}
                  type={profileFields["username"].type}
                  component={TextInput}
                />

                <Field
                  fieldObj={profileFields["hometown"]}
                  name={profileFields["hometown"].name}
                  type={profileFields["hometown"].type}
                  component={TextInput}
                />
                <Field
                  name="birthDate"
                  component={DateInput}
                  dateFormat="YYYY-MM-DD"
                  showYearDropdown={true}
                  showMonthDropdown={true}
                  dropdownMode="select"
                  placeholder="Date of Birth"
                  label="Date of Birth"
                  resetInputValue={resetInputValue}
                />
                <div>
                  <label className="p-0 m-0 pl-1">
                    <small>Gender</small>
                  </label>
                  <div>
                    <Field
                      name={profileFields["genderMale"].name}
                      type={profileFields["genderMale"].type}
                      label={profileFields["genderMale"].label}
                      value={profileFields["genderMale"].value}
                      component={RadioInput}
                    />
                    <Field
                      name={profileFields["genderFemale"].name}
                      type={profileFields["genderFemale"].type}
                      label={profileFields["genderFemale"].label}
                      value={profileFields["genderFemale"].value}
                      component={RadioInput}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={invalid || submitting}
                  className="mt-2 btn btn-outline-secondary btn-sm btn-block"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = combineValidators({
  username: composeValidators(
    isRequired({ message: "Username is a required field" }),
    hasLengthBetween(3, 15)({
      message: "Username must be between 3-15 characters"
    })
  )()
});

export default connect(
  null,
  {}
)(
  reduxForm({
    form: "profileForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    validate
  })(BasicForm)
);
