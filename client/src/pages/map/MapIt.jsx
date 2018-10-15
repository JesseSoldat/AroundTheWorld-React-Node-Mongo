import React, { Component } from "react";
import Map from "./Map";

class MapIt extends Component {
  state = {
    lat: 0,
    lng: 0
  };

  moveMarker = ({ x, y, lat, lng, event }) => {
    this.setState({ lat, lng });
  };

  selectPlace = () => {
    console.log(this.state);
  };

  cancel = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { lat, lng } = this.state;
    return (
      <div>
        <Map
          marker={{ lat, lng }}
          moveMarker={this.moveMarker}
          showBtns={true}
          cancel={this.cancel}
          selectPlace={this.selectPlace}
        />
      </div>
    );
  }
}

export default MapIt;
