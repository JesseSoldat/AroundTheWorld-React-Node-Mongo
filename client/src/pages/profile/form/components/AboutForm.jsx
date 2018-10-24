import React from "react";
import { Field, reduxForm } from "redux-form";
// common components
import TextArea from "../../../../components/form/TextArea";
import TextInput from "../../../../components/form/TextInput";
// data
import profileFields from "../helpers/profileFields";

const AboutForm = ({ submitting, handleSubmit, updateProfile }) => {
  return (
    <div className="col-xs-12 col-md-8 mx-auto">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h4>About</h4>
              <form onSubmit={handleSubmit(updateProfile)}>
                <Field
                  fieldObj={profileFields["about"]}
                  name={profileFields["about"].name}
                  type={profileFields["about"].type}
                  component={TextArea}
                />
                <Field
                  fieldObj={profileFields["occupation"]}
                  name={profileFields["occupation"].name}
                  type={profileFields["occupation"].type}
                  component={TextInput}
                />

                <button
                  type="submit"
                  disabled={submitting}
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
};

export default reduxForm({
  form: "profileForm",
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutForm);
