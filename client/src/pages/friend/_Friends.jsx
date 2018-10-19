import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { startGetFriends } from "../../actions/friendActions";

class Friends extends Component {
  componentDidMount() {
    this.props.startGetFriends(this.props.userId);
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth._id
});

export default connect(
  mapStateToProps,
  { startGetFriends }
)(Friends);
