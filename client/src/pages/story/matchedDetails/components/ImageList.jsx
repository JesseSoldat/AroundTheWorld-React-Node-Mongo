import React from "react";

const ImageList = ({ images, viewLargePhotoModal }) => {
  const onViewLargePhotoModal = img => () => viewLargePhotoModal(img);

  // render dom
  const renderImages = () =>
    images.map(img => (
      <div
        key={img._id}
        className="cursorAllowed col-xs-4 col-md-3 col-lg-2 m-2"
      >
        <img
          src={img.downloadURL}
          alt="story"
          onClick={onViewLargePhotoModal(img)}
          className="img-fluid rounded mx-auto d-block"
        />
      </div>
    ));

  return <div className="row">{renderImages()}</div>;
};

export default ImageList;
