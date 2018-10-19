import React from "react";

const ImageList = ({ images }) => {
  return (
    <div className="row">
      {images.map((img, i) => (
        <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-2 mx-auto">
          <img src={img} className="rounded mx-auto d-block" />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
