import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Spinner from "../../../components/loading/Spinner";
import Accordion from "../../../components/Accordion";
import TopRowBtns from "../../../components/buttons/TopRowBtns";
// custom components
import Map from "../../map/Map";
import MatchedUserImages from "./components/MatchedUserImages";
// utils
import checkFriendStatus from "../../../utils/checkFriendStatus";
// actions
import { startGetMatchedStoryDetails } from "../../../actions/storyActions";
import {
  startSendFriendRequest,
  startAcceptFriendRequest
} from "../../../actions/friendActions";

class MatchedDetails extends Component {
  componentDidMount() {
    const { storyId } = this.props.match.params;
    this.props.startGetMatchedStoryDetails(storyId);
  }

  // format data to pass to children
  formatAccordionData = matchedDetails => {
    const data = {
      title1: "Story",
      title2: "Map",
      title3: "Photos",
      icon1: "fas fa-atlas mr-2",
      icon2: "fas fa-map-marked-alt mr-2",
      icon3: "fas fa-images mr-2",
      matchedUserId: matchedDetails.user._id,
      description: matchedDetails.description,
      coordinates: matchedDetails.geometry.coordinates
    };
    return data;
  };

  // cb & events
  sendRequest = () => {
    const { userId, matchedDetails, startSendFriendRequest } = this.props;
    const matchedUserId = matchedDetails.user._id;
    startSendFriendRequest(userId, matchedUserId);
  };

  acceptRequest = () => {
    const { userId, matchedDetails, startAcceptFriendRequest } = this.props;
    const matchedUserId = matchedDetails.user._id;
    startAcceptFriendRequest(userId, matchedUserId);
  };

  goBack = () => {
    const { userId } = this.props.match.params;
    this.props.history.push(`/matchedList/${userId}`);
  };

  render() {
    const {
      loading,
      userId,
      matchedDetails,
      friendIds,
      friendRequests
    } = this.props;
    let content, title, status;

    if (loading) content = <Spinner />;
    else if (matchedDetails && matchedDetails.geometry) {
      title = matchedDetails.title;
      const data = this.formatAccordionData(matchedDetails);

      if (friendRequests) {
        console.log("friendRequest", friendRequests);

        status = checkFriendStatus({
          userId,
          matchedUserId: data.matchedUserId,
          friendIds,
          friendRequests
        });
      }

      content = (
        <Accordion
          data={data}
          accordionTop={<p>{data.description}</p>}
          accordionMiddle={
            <Map
              map={[data.coordinates[1], data.coordinates[0]]}
              height="400px"
              marker={{
                markerLng: data.coordinates[0],
                markerLat: data.coordinates[1]
              }}
            />
          }
          accordionBottom={
            <MatchedUserImages
              status={status}
              images={matchedDetails.images}
              sendRequest={this.sendRequest}
              acceptRequest={this.acceptRequest}
            />
          }
        />
      );
    }

    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          <Heading title={title}>
            <TopRowBtns btn0Cb={this.goBack} showLeftBtns={true} />
          </Heading>
          <div className="row mt-4">
            <div className="col-xs-12 col-sm-10 mx-auto">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ async, story, friend, auth }) => ({
  loading: async.loading,
  matchedDetails: story.matchedDetails,
  friendRequests: friend.friendRequests,
  friendIds: friend.friendIds,
  userId: auth._id
});

export default connect(
  mapStateToProps,
  {
    startGetMatchedStoryDetails,
    startSendFriendRequest,
    startAcceptFriendRequest
  }
)(MatchedDetails);
