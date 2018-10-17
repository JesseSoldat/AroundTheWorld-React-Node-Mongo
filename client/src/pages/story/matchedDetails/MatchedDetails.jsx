import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
import Accordion from "../../../components/Accordion";
// custom components
import StaticMap from "../../map/StaticMap";

// actions
import { startGetMatchedStoryDetails } from "../../../actions/storyActions";

class MatchedDetails extends Component {
  componentDidMount() {
    const { storyId } = this.props.match.params;
    this.props.startGetMatchedStoryDetails(storyId);
  }

  formatAccordionData = matchedDetails => {
    console.log(matchedDetails);

    const data = {
      title1: "Story",
      title2: "Map",
      title3: "Photos",
      cardBody1: matchedDetails.description,
      coordinates: matchedDetails.geometry.coordinates
    };

    return data;
  };

  render() {
    const { loading, matchedDetails } = this.props;
    let content;

    if (loading) content = <Spinner />;
    else if (matchedDetails) {
      const data = this.formatAccordionData(matchedDetails);
      content = (
        <Accordion data={data}>
          <StaticMap coordinates={data.coordinates} />{" "}
        </Accordion>
      );
    }

    return (
      <div className="storyDetailsWrapper">
        <Heading title="Story Details" />
        <div className="row mt-4">
          <div className="col-xs-12 col-sm-10 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ async, story, friend }) => ({
  loading: async.loading,
  matchedDetails: story.matchedDetails,
  friendRequests: friend.friendRequests,
  friends: friend.friends
});

export default connect(
  mapStateToProps,
  { startGetMatchedStoryDetails }
)(MatchedDetails);
