import React, { Component } from "react";
import { connect } from "react-redux";
// common component
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
import withStorage from "../../../components/hoc/withStorage";

// MatchedList
class ComponentNeedingStorage extends Component {
  componentDidMount() {
    const haveInStorage = this.props.load("matchedUser");
    if (haveInStorage) {
      const matchedUser = JSON.parse(haveInStorage);
      console.log(matchedUser);
    } else {
      // store?
      // api call
    }
  }

  render() {
    const { loading } = this.props;

    let content;

    if (loading) content = <Spinner />;
    return (
      <div className="storyListWrapper">
        <Heading title="Matched User" />

        <div className="row">
          <div className="col-xs-12 col-sm-11 mx-auto my-3 d-flex flex-wrap justify-content-between storiesContainer">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const MatchedList = withStorage(ComponentNeedingStorage);

const mapStateToProps = ({ async }) => ({
  loading: async.loading
});

export default connect(
  mapStateToProps,
  {}
)(withStorage(MatchedList));
