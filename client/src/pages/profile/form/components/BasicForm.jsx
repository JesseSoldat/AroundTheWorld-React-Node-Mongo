import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// common components
import TextInput from "../../../../components/form/TextInput";
// data
import profileFields from "../helpers/profileFields";

class BasicForm extends Component {
  updateProfile = () => [];
  render() {
    const { pristine, submitting, handleSubmit } = this.props;

    return (
      <div className="col-xs-12 col-md-8 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h4>Basics</h4>
                <form onSubmit={handleSubmit(this.updateProfile)}>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: "profileForm", enableReinitialize: true })(
  BasicForm
);
