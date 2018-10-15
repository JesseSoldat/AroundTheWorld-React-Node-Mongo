import React, { Component } from "react";
import { connect } from "react-redux";
import { combineValidators, composeValidators, isRequired } from "revalidate";
import isValidEmail from "./helpers/isValidEmail";
import { Field, reduxForm } from "redux-form";

// common components
import Heading from "../../components/Heading";
import TextInput from "../../components/form/TextInput";
// helpers
import { loginFields as authFields } from "./helpers/authFields";
// Actions
import { startLogin } from "../../actions/authActions";

class Login extends Component {
  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <div className="container">
        <div className="spacer100" />
        <div className="row">
          <div className="col-sm-12 col-md-10 mx-auto">
            <div className="card authFormCard">
              <Heading title="login" />
              <div className="card-block">
                <form onSubmit={handleSubmit(this.props.startLogin)}>
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
  email: composeValidators(
    isRequired({ message: "Email is a required field" }),
    isValidEmail({ message: "Please enter a valid email" })
  )(),
  password: isRequired({ message: "Please enter a password" })
});

export default connect(
  null,
  { startLogin }
)(reduxForm({ form: "loginForm", validate })(Login));
