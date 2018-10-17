import React from "react";

const ImgCard = ({ data, cb }) => {
  const btnClicked = () => {
    cb(data);
  };

  return (
    <div className="card m-4" style={{ width: "300px", height: "450px" }}>
      <img
        src="https://via.placeholder.com/150x150"
        alt="map"
        className="card-img-top"
        style={{ height: "250px" }}
      />
      <div className="card-body d-flex-column justify-content-between">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text mt-3">{data.description}</p>
      </div>
      <button
        onClick={btnClicked}
        className="btn btn-primary btn-block mb-3 mx-auto"
        style={{ width: "96%" }}
      >
        View Details
      </button>
    </div>
  );
};

export default ImgCard;
