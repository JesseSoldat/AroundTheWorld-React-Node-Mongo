import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import googleMapsApiKey from "../../_config/googleKey";
import Marker from "./Marker";

class Map extends Component {
  render() {
    const {
      map,
      marker,
      zoom,
      height = "100vh",
      moveMarker,
      showBtns = false,
      cancel,
      selectPlace
    } = this.props;
    return (
      <div style={{ height, width: "100%", position: "relative" }}>
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
          defaultCenter={map}
          defaultZoom={zoom}
          onClick={moveMarker}
        >
          {marker && <Marker lat={marker.markerLat} lng={marker.markerLng} />}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
