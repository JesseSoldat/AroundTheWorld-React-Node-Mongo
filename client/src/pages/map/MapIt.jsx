import React, { Component } from "react";
import Map from "./Map";

class MapIt extends Component {
  state = {
    markerLat: 18.646245142670608,
    markerLng: 18.646245142670608
  };

  moveMarker = ({ lat, lng }) => {
    this.setState({ markerLat: lat, markerLng: lng });
  };

  selectPlace = () => {
    const { markerLat, markerLng } = this.state;
    this.props.history.push(`/createStory?lat=${markerLat}&lng=${markerLng}`);
  };

  cancel = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { markerLat, markerLng } = this.state;
    return (
      <div>
        <Map
          map={{ lat: markerLat, lng: markerLng }}
          marker={{ markerLat, markerLng }}
          moveMarker={this.moveMarker}
          showBtns={true}
          cancel={this.cancel}
          selectPlace={this.selectPlace}
          zoom={-10}
        />
      </div>
    );
  }
}

export default MapIt;
