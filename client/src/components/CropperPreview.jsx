import React from "react";
import IconBtns from "./buttons/IconBtn";

const CropperPreview = ({ files, cropResult, cancelCrop, uploadImage }) => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 my-2">
      <div className="imageUploadCard card">
        <div className="card-body text-center">
          <h4 className="mb-4 imgUploadTitle">Step 3 - Preview and Upload</h4>
          {files[0] && (
            <div>
              <div className="finalImageWrapper">
                <img className="previewImg" src={cropResult} />
              </div>
              <div className="mt-2">
                <IconBtns
                  btnClass="btn btn-danger mr-2"
                  iconClass="fas fa-backspace mr-2"
                  text="Cancel"
                  cb={cancelCrop}
                />
                <IconBtns
                  btnClass="btn btn-secondary mr-2"
                  iconClass="fas fa-file-upload mr-2"
                  text="Upload"
                  cb={uploadImage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropperPreview;
