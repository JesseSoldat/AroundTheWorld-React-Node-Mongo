import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
// actions
import { startGetStories } from "../../../actions/storyActions";

class StoryList extends Component {
  componentDidMount() {
    this.props.startGetStories();
  }

  render() {
    const { loading, stories } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (stories && stories.length) {
      content = (
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="mt-3">Has Stories</h3>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="mt-3">No stories found for this user</h3>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <Heading title="Stories" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ async, story }) => ({
  loading: async.loading,
  stories: story.stories
});

export default connect(
  mapStateToProps,
  { startGetStories }
)(StoryList);
