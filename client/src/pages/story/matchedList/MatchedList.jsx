import React, { Component } from "react";
import { connect } from "react-redux";
// common component
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
import ImgCard from "../../../components/cards/ImgCard";
import withStorage from "../../../components/hoc/withStorage";

// MatchedList
class ComponentNeedingStorage extends Component {
  componentDidMount() {
    const matchedUser = this.checkStorage();
    if (matchedUser) {
      console.log(matchedUser);
    } else {
      // store?
      // api call
    }
  }

  checkStorage = () => {
    const haveInStorage = this.props.load("matchedUser");
    if (haveInStorage) {
      return JSON.parse(haveInStorage);
    }
    return null;
  };

  viewDetails = story => {
    console.log(story._id);
    this.props.history.push(`/matchedDetails/${story._id}`);
  };

  render() {
    const { loading } = this.props;
    const lsMatchedUser = this.checkStorage();
    let content;

    if (loading) content = <Spinner />;
    else if (lsMatchedUser) {
      const { stories } = lsMatchedUser;

      if (stories.length) {
        content = lsMatchedUser.stories.map(story => (
          <ImgCard
            key={story._id}
            storyId={story._id}
            data={story}
            cb={this.viewDetails}
          />
        ));
      }
    }

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
