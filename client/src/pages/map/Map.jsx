import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import googleMapsApiKey from "../../_config/googleKey";
import Marker from "./Marker";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: -8
  };

  render() {
    const {
      marker,
      moveMarker,
      showBtns = false,
      cancel,
      selectPlace
    } = this.props;
    return (
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        {showBtns && (
          <div
            style={{ zIndex: 3, position: "absolute", top: "2%", right: "8%" }}
          >
            <button onClick={cancel} className="btn btn-danger mr-2">
              Cancel
            </button>
            <button onClick={selectPlace} className="btn btn-primary">
              Select
            </button>
          </div>
        )}

        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={moveMarker}
        >
          <Marker lat={marker.lat} lng={marker.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
