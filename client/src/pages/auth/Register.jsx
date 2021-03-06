import React, { Component } from "react";
import { connect } from "react-redux";
import {
  combineValidators,
  composeValidators,
  matchesField,
  isRequired,
  hasLengthBetween
} from "revalidate";
import isValidEmail from "./helpers/isValidEmail";
import { Field, reduxForm } from "redux-form";

// common components
import Heading from "../../components/Heading";
import TextInput from "../../components/form/TextInput";
// helpers
import { registerFields as authFields } from "./helpers/authFields";
// Actions
import { startRegister } from "../../actions/authActions";

class Register extends Component {
  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <div className="container">
        <div className="spacer100" />
        <div className="row">
          <div className="col-sm-12 col-md-10 mx-auto">
            <div className="card authFormCard">
              <Heading title="register" />
              <div className="card-block">
                <form onSubmit={handleSubmit(this.props.startRegister)}>
                  {authFields &&
                    authFields.map((obj, i) => (
                      <Field
                        key={i}
                        fieldObj={obj}
                        name={obj.name}
                        type={obj.type}
                        component={TextInput}
                      />
                    ))}
                  <button
                    type="submit"
                    disabled={invalid || submitting}
                    className="btn btn-info btn-block mt-4"
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
  username: composeValidators(
    isRequired({ message: "Username is a required field" }),
    hasLengthBetween(3, 15)({
      message: "Username must be between 3-15 characters"
    })
  )(),
  email: composeValidators(
    isRequired({ message: "Email is a required field" }),
    isValidEmail({ message: "Please enter a valid email" })
  )(),
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

export default connect(
  null,
  { startRegister }
)(reduxForm({ form: "registerForm", validate })(Register));
