import React from "react";

const StoryImages = ({ images, addPhotos, viewLargePhotoModal }) => {
  const onViewLargePhotoModal = img => () => viewLargePhotoModal(img);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <button className="floatRight btn btn-primary" onClick={addPhotos}>
            Add Photos
          </button>
        </div>
      </div>
      <div className="row">
        {images.map(img => (
          <div
            key={img._id}
            className="col-xs-4 col-md-3 col-lg-2 m-2"
            onClick={onViewLargePhotoModal(img)}
          >
            <img className="img-fluid" src={img.downloadURL} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryImages;
