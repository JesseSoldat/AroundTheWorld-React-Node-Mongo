import React from "react";
import Dropzone from "react-dropzone";

const DropZone = ({
  wrapperClass = "col-sm-12 col-lg-4 my-2",
  text = "Step 1 - Add Photo",
  multiple = false,
  onDrop
}) => {
  return (
    <div className={wrapperClass}>
      <div className="imageUploadCard card">
        <div className="card-body d-flex flex-column align-items-center">
          <h4 className="mb-4 imgUploadTitle">{text}</h4>
          <div>
            <Dropzone onDrop={onDrop} multiple={multiple}>
              <div
                style={{
                  paddingTop: "30px",
                  textAlign: "center"
                }}
              >
                <i className="fas fa-upload" />

                <h3>Drop image here or click to upload</h3>
              </div>
            </Dropzone>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
