import React, { Component } from "react";
import Map from "./Map";
import IconBtn from "../../components/buttons/IconBtn";

class MapIt extends Component {
  state = {
    lat: 18.646245142670608,
    lng: 18.0
  };

  // cbs & events
  moveMarker = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    this.setState({ lat, lng });
  };

  selectPlace = () => {
    const { lat, lng } = this.state;
    this.props.history.push(`/createStory?lat=${lat}&lng=${lng}`);
  };

  cancel = () => this.props.history.push("/dashboard");

  render() {
    const { lat, lng } = this.state;
    return (
      <div>
        <div style={{ zIndex: 3, position: "absolute", top: "0", right: "5%" }}>
          <div className="spacer70" />
          <IconBtn
            btnClass="btn btn-danger mr-2"
            iconClass="fas fa-backspace"
            text="Cancel"
            cb={this.cancel}
          />
          <IconBtn
            btnClass="btn btn-secondary"
            iconClass="fas fa-check"
            text="Select"
            cb={this.selectPlace}
          />
        </div>

        <Map lat={lat} lng={lng} moveMarker={this.moveMarker} zoom={3} />
      </div>
    );
  }
}

export default MapIt;
