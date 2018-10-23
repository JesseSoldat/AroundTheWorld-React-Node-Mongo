import React from "react";
import googleMapsApiKey from "../../_config/googleKey";
const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
const key = `&key=${googleMapsApiKey}`;

const StaticMap = ({
  coordinates,
  zoom = 10,
  width = "90%",
  containerCss = "row"
}) => {
  const query = `?center=${coordinates[1]},${
    coordinates[0]
  }&zoom=${zoom}&size=400x400`;

  return (
    <div className={containerCss}>
      <div className="mx-auto" style={{ width }}>
        <img
          src={`${baseUrl}${query}${key}`}
          style={{ width, margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default StaticMap;
