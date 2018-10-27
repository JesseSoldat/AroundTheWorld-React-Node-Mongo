import React from "react";
// custom components
import StaticMap from "../../pages/map/StaticMap";
// utils
import truncateStr from "../../utils/stringManipulation/truncateStr";

const MapCard = ({ data, coordinates, cb }) => {
  const btnClicked = () => {
    cb(data);
  };

  return (
    <div
      className="card m-4"
      style={{ width: "300px", height: "450px", overflow: "hidden" }}
    >
      <div
        className="mx-auto"
        style={{
          width: "300px",
          height: "250px",
          overflow: "hidden",
          borderRadius: "3px"
        }}
      >
        <StaticMap coordinates={coordinates} width="100%" zoom={6} />
      </div>

      <div className="mt-2 card-body ">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text mt-3">{truncateStr(data.description, 50)}</p>
      </div>
      <button
        onClick={btnClicked}
        className="btn btn-secondary btn-sm btn-block mb-3 mx-auto"
        style={{ width: "90%" }}
      >
        View Details
      </button>
    </div>
  );
};

export default MapCard;
