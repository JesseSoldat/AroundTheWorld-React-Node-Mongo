import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Heading from "../../components/Heading";
// actions
import { startCheckToken } from "../../actions/authActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.startCheckToken();
  }
  render() {
    return (
      <div>
        <Heading title="Dashboard" />
      </div>
    );
  }
}

export default connect(
  null,
  { startCheckToken }
)(Dashboard);
