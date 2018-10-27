import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import googleMapsApiKey from "../../_config/googleKey";

class MapContainer extends Component {
  render() {
    const {
      lat,
      lng,
      zoom = 12,
      width = "100%",
      height = "100vh",
      moveMarker = () => {}
    } = this.props;

    return (
      <Map
        onClick={moveMarker}
        google={this.props.google}
        zoom={zoom}
        style={{ width, height }}
        initialCenter={{
          lat,
          lng
        }}
      >
        <Marker position={{ lat, lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey
})(MapContainer);
