import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
// common components
import SelectInput from "../form/SelectInput";
import RadioInput from "../form/RadioInput";
import ShowHide from "../ShowHide";
// custom components
import StaticMap from "../../pages/map/StaticMap";
// utils
import truncateStr from "../../utils/stringManipulation/truncateStr";
// css
import "./ListCard.css";

const ListCard = ({
  handleSubmit,
  submitting,
  invalid,
  isCurrentUser,
  story,
  distances,
  tryToMatchOthers
}) => {
  const { title, description, geometry, _id: storyId } = story;

  const matchOthers = values => tryToMatchOthers(story, values);

  const renderFormBtns = () => {
    return [
      <ShowHide key="regFormBtn" size="lg" type="inline">
        <button
          disabled={invalid | submitting}
          type="submit"
          className="btn btn-primary d-inline mr-2"
        >
          Match Others
        </button>
      </ShowHide>,
      <ShowHide key="blockFormBtn" size="xs-md">
        <button
          disabled={invalid | submitting}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Match Others
        </button>
      </ShowHide>
    ];
  };

  const renderLinkBtns = () => {
    return [
      <ShowHide key="regLinkBtn" size="lg" type="inline">
        <Link to={`/storyDetails/${storyId}`}>
          <button type="button" className="btn btn-secondary d-inline">
            View Story Details
          </button>
        </Link>
      </ShowHide>,
      <ShowHide key="blockLinkBtn" size="xs-md">
        <Link to={`/storyDetails/${storyId}`}>
          <button type="button" className="mt-2 btn btn-secondary btn-block">
            View Story Details
          </button>
        </Link>
      </ShowHide>
    ];
  };

  return (
    <div className="card my-4">
      <div className="card-body">
        <div className="row">
          <div className="text-left col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{truncateStr(description)}</p>

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

              {renderFormBtns()}
              {isCurrentUser && renderLinkBtns()}
            </form>
          </div>

          <div className="cardImg col-xs-12 col-sm-12 col-md-12 col-lg-6">
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
