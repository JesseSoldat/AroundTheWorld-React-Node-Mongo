import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Heading from "../../components/Heading";
import TileCard from "../../components/cards/TileCard";
// actions
import { startCheckToken } from "../../actions/authActions";
// data
import dashboardCardData from "./helpers/dashboardCardData";

class Dashboard extends Component {
  componentDidMount() {
    this.props.startCheckToken();
  }
  render() {
    return (
      <div>
        <Heading title="Dashboard" />
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-around my-4">
            {dashboardCardData.map((obj, i) => (
              <TileCard key={i} data={obj} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { startCheckToken }
)(Dashboard);
