import React from "react";
// utils
import truncateStr from "../../utils/stringManipulation/truncateStr";

const ImgCard = ({ data, cb, image }) => {
  const btnClicked = () => {
    cb(data);
  };

  return (
    <div className="card m-4" style={{ width: "300px", height: "450px" }}>
      <div
        className="mx-auto p-2"
        style={{
          width: "280px",
          height: "250px",
          overflow: "hidden",
          borderRadius: "3px"
        }}
      >
        {image}
      </div>

      <div className="mt-2 card-body d-flex-column justify-content-between">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text mt-3">{truncateStr(data.description)}</p>
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

export default ImgCard;
