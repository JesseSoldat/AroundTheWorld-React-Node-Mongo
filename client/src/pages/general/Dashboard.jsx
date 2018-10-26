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
  // lifecycles
  componentDidMount() {
    this.props.startCheckToken();
  }

  // render dom
  renderTileCards = () =>
    dashboardCardData.map((obj, i) => <TileCard key={i} data={obj} />);

  render() {
    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          <Heading title="Dashboard" />
          <div className="bulletinBg row">
            <div className="col-12 d-flex flex-wrap justify-content-around my-4">
              {this.renderTileCards()}
            </div>
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
