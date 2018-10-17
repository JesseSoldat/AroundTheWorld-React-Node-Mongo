import React from "react";
import googleMapsApiKey from "../../_config/googleKey";
const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
const key = `&key=${googleMapsApiKey}`;

const StaticMap = ({ coordinates, width = "100%" }) => {
  const query = `?center=${coordinates[1]},${
    coordinates[0]
  }&zoom=10&size=400x400`;

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-10 col-md-8 mx-auto">
        <img
          src={`${baseUrl}${query}${key}`}
          style={{ width, margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default StaticMap;
