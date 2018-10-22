import React from "react";
import IconBtn from "../../../components/buttons/IconBtn";

const StoryImages = ({ images, addPhotos, viewLargePhotoModal }) => {
  const onViewLargePhotoModal = img => () => viewLargePhotoModal(img);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <IconBtn
            btnClass="floatRight btn btn-sm btn-primary"
            iconClass="fas fa-plus"
            text="Add Photos"
            cb={addPhotos}
            type="button"
          />
        </div>
      </div>
      <div className="row">
        {images.map(img => (
          <div
            key={img._id}
            className="cursorAllowed col-xs-4 col-md-3 col-lg-2 m-2"
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
