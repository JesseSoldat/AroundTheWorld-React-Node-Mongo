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
import {
  getMatchedStoryDetails,
  startGetMatchedStoryDetails
} from "../../../actions/storyActions";
import { openModal } from "../../../actions/modalActions";
import {
  startSendFriendRequest,
  startAcceptFriendRequest
} from "../../../actions/friendActions";

class MatchedDetails extends Component {
  // lifecycles
  componentDidMount() {
    this.fetchMatchedStoryDetails();
  }

  componentWillUnmount() {
    this.props.getMatchedStoryDetails({ story: null });
  }

  // api calls
  fetchMatchedStoryDetails = () => {
    const { storyId } = this.props.match.params;
    this.props.startGetMatchedStoryDetails(storyId);
  };

  // cb & events
  viewLargePhotoModal = data => {
    const { storyId } = this.props.match.params;

    this.props.openModal({
      modalType: "viewOthersPhoto",
      data: { ...data, storyId }
    });
  };

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

  // format data to pass to children
  formatAccordionData = matchedDetails => ({
    title1: "Story",
    title2: "Map",
    title3: "Photos",
    icon1: "fas fa-atlas mr-2",
    icon2: "fas fa-map-marked-alt mr-2",
    icon3: "fas fa-images mr-2",
    matchedUserId: matchedDetails.user._id,
    description: matchedDetails.description,
    coordinates: matchedDetails.geometry.coordinates
  });

  // render dom
  renderHeader = () => {
    const { matchedDetails } = this.props;
    const title = matchedDetails ? matchedDetails.title : "";

    return (
      <Heading title={title}>
        <TopRowBtns btn0Cb={this.goBack} showLeftBtns={true} />
      </Heading>
    );
  };

  renderContent = () => {
    const {
      loading,
      userId,
      matchedDetails,
      friendIds,
      friendRequests
    } = this.props;

    let status;

    if (loading) return <Spinner />;
    else if (matchedDetails && matchedDetails.geometry) {
      const data = this.formatAccordionData(matchedDetails);

      status = checkFriendStatus({
        userId,
        matchedUserId: data.matchedUserId,
        friendIds,
        friendRequests
      });

      return (
        <Accordion
          data={data}
          accordionTop={<p>{data.description}</p>}
          accordionMiddle={
            <div style={{ overflow: "hidden", height: "400px" }}>
              <Map
                lat={data.coordinates[1]}
                lng={data.coordinates[0]}
                zoom={8}
                height="400px"
                width="95%"
              />
            </div>
          }
          accordionBottom={
            <MatchedUserImages
              status={status}
              images={matchedDetails.images}
              sendRequest={this.sendRequest}
              acceptRequest={this.acceptRequest}
              viewLargePhotoModal={this.viewLargePhotoModal}
            />
          }
        />
      );
    }
  };

  render() {
    const header = this.renderHeader();
    const content = this.renderContent();

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-lg-8 mx-auto">
          {header}
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ story, friend, auth }) => ({
  loading: story.loading,
  matchedDetails: story.matchedDetails,
  friendRequests: friend.friendRequests,
  friendIds: friend.friendIds,
  userId: auth._id
});

export default connect(
  mapStateToProps,
  {
    openModal,
    getMatchedStoryDetails,
    startGetMatchedStoryDetails,
    startSendFriendRequest,
    startAcceptFriendRequest
  }
)(MatchedDetails);
