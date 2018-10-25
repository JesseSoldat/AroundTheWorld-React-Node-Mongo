import React from "react";
import { Link } from "react-router-dom";

const TileCard = ({ data }) => {
  const { title, subtitle, link, iconClass, linkText } = data;
  return (
    <div className="card my-3" style={{ width: "300px", height: "250px" }}>
      <div className="card-body d-flex flex-column align-items-center justify-content-between">
        <div className="text-center">
          <h5 className="card-title pt-2">{title}</h5>
          <p className="card-text py-4">{subtitle}</p>
        </div>

        <Link className="w-100" to={link}>
          <button className="btn btn-outline-dark btn-sm btn-block">
            <i className={`${iconClass} mr-2`} />
            {linkText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TileCard;
