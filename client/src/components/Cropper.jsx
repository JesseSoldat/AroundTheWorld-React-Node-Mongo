import React, { Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class Crop extends Component {
  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") return;

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      const imageUrl = URL.createObjectURL(blob);

      this.props.updateCropResult(imageUrl, blob);
    }, "image/jpeg");
  };

  render() {
    const {
      wrapperClass = "col-xs-12 col-sm-12 col-md-12 col-lg-4 my-2",
      aspectRatio = 4 / 3,
      text = "Step 2 - Resize image",
      files
    } = this.props;
    return (
      <div className={wrapperClass}>
        <div className="imageUploadCard card">
          <div className="card-body text-center d-flex flex-column align-items-center">
            <h4 className="mb-4 imgUploadTitle">{text}</h4>
            <div className="cropperWrapper">
              {files[0] && (
                <Cropper
                  className="cropper"
                  style={{ height: 200, width: 280 }}
                  ref="cropper"
                  src={files[0].preview}
                  aspectRatio={aspectRatio}
                  viewMode={0}
                  dragMode="move"
                  guides={false}
                  scalable={true}
                  cropBoxMovable={true}
                  cropBoxResizable={true}
                  crop={this.cropImage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Crop;
