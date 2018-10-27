import React from "react";
import googleMapsApiKey from "../../_config/googleKey";
const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
const key = `&key=${googleMapsApiKey}`;

const StaticMap = ({ coordinates, zoom = 10, width = "100%" }) => {
  const query = `?center=${coordinates[1]},${
    coordinates[0]
  }&zoom=${zoom}&size=400x400`;

  const url = `${baseUrl}${query}${key}`;

  return <img alt="static map" src={url} style={{ width, margin: "0 auto" }} />;
};

export default StaticMap;
