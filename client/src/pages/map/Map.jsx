import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import googleMapsApiKey from "../../_config/googleKey";
import Marker from "./Marker";

class Map extends Component {
  state = {
    lat: 0,
    lng: 0
  };
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: -8
  };

  moveMarker = ({ x, y, lat, lng, event }) => {
    this.setState({ lat, lng });
  };

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.moveMarker}
        >
          <Marker lat={this.state.lat} lng={this.state.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
