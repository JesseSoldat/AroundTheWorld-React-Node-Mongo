import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { startGetStories } from "../../../actions/storyActions";

class StoryList extends Component {
  componentDidMount() {
    this.props.startGetStories();
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  { startGetStories }
)(StoryList);
