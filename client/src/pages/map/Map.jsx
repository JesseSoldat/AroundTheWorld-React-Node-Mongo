import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import googleMapsApiKey from "../../_config/googleKey";
import Marker from "./Marker";

import IconBtn from "../../components/buttons/IconBtn";

class Map extends Component {
  render() {
    const {
      map,
      marker,
      zoom = 8,
      height = "100vh",
      moveMarker = () => {},
      showBtns = false,
      cancel = () => {},
      selectPlace = () => {}
    } = this.props;

    return (
      <div style={{ height, width: "100%", position: "relative" }}>
        {showBtns && (
          <div
            style={{ zIndex: 3, position: "absolute", top: "2%", right: "8%" }}
          >
            <IconBtn
              btnClass="btn btn-danger mr-2"
              iconClass="fas fa-backspace"
              text="Cancel"
              cb={cancel}
            />
            <IconBtn
              btnClass="btn btn-secondary"
              iconClass="fas fa-check"
              text="Select"
              cb={selectPlace}
            />
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
