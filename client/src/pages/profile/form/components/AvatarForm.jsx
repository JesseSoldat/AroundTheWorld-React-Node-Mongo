import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import DropZone from "../../../../components/DropZone";
import Cropper from "../../../../components/Cropper";
import CropperPreview from "../../../../components/CropperPreview";
// actions
import { startUploadAvatarImage } from "../../../../actions/imageActions";

class AvatarForm extends Component {
  state = {
    files: [],
    cropResult: null,
    image: {}
  };

  // drop-zone
  onDrop = files =>
    this.setState({
      files
    });

  // cropper
  updateCropResult = (cropResult, image) =>
    this.setState({ cropResult, image });

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  // api call
  uploadImage = () => this.props.startUploadAvatarImage(this.state.image);

  render() {
    return (
      <div className="col-xs-12 col-md-8 mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <DropZone wrapperClass="col-12" onDrop={this.onDrop} />
            </div>

            <div className="row">
              <Cropper
                wrapperClass="col-12"
                aspectRatio={1}
                files={this.state.files}
                updateCropResult={this.updateCropResult}
              />
            </div>

            <div className="row">
              <CropperPreview
                wrapperClass="col-12"
                imgClass="previewSquareImg"
                files={this.state.files}
                cropResult={this.state.cropResult}
                cancelCrop={this.cancelCrop}
                uploadImage={this.uploadImage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { startUploadAvatarImage }
)(AvatarForm);
