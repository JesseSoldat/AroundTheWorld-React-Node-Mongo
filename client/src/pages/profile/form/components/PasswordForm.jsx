import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
  combineValidators,
  composeValidators,
  matchesField,
  isRequired,
  hasLengthBetween
} from "revalidate";
// common components
import TextInput from "../../../../components/form/TextInput";
// data
import profileFields from "../helpers/profileFields";

class PasswordForm extends Component {
  render() {
    const { submitting, invalid, handleSubmit, updatePassword } = this.props;

    return (
      <div className="col-xs-12 col-md-8 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h4>Change your password</h4>
                <form onSubmit={handleSubmit(updatePassword)}>
                  <Field
                    fieldObj={profileFields["password"]}
                    name={profileFields["password"].name}
                    type={profileFields["password"].type}
                    component={TextInput}
                  />
                  <Field
                    fieldObj={profileFields["confirm"]}
                    name={profileFields["confirm"].name}
                    type={profileFields["confirm"].type}
                    component={TextInput}
                  />

                  <button
                    type="submit"
                    disabled={invalid || submitting}
                    className="mt-4 btn btn-outline-secondary btn-sm btn-block"
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
  }
}

const validate = combineValidators({
  password: composeValidators(
    isRequired({ message: "Please enter a password" }),
    hasLengthBetween(6, 15)({
      message: "Password must be between 6-15 characters"
    })
  )(),
  confirm: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("password")({ message: "Passwords do not match" })
  )()
});

export default reduxForm({ form: "passwordForm", validate })(PasswordForm);
