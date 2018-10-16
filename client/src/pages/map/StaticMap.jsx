import React from "react";
import googleMapsApiKey from "../../_config/googleKey";
const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
const key = `&key=${googleMapsApiKey}`;

const StaticMap = ({ coordinates }) => {
  const query = `?center=${coordinates[1]},${
    coordinates[0]
  }&zoom=10&size=400x400`;

  return (
    <div>
      <img src={`${baseUrl}${query}${key}`} style={{ width: "100%" }} />
    </div>
  );
};

export default StaticMap;
