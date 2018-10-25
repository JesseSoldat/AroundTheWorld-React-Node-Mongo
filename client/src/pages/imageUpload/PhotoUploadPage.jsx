import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../components/Heading";
import TopRowBtns from "../../components/buttons/TopRowBtns";
import DropZone from "../../components/DropZone";
import Cropper from "../../components/Cropper";
import CropperPreview from "../../components/CropperPreview";
// actions
import { startUploadStoryImage } from "../../actions/imageActions";
// css
import "./PhotoUploadPage.css";

class PhotoUploadPage extends Component {
  state = {
    files: [],
    cropResult: null,
    image: {}
  };

  // drop-zone
  onDrop = files => this.setState({ files });

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
  uploadImage = () => {
    const { storyId } = this.props.match.params;
    this.props.startUploadStoryImage(
      this.state.image,
      storyId,
      this.props.history
    );
  };

  // cb
  goBack = () => {
    const { storyId } = this.props.match.params;
    this.props.history.push(`/storyDetails/${storyId}`);
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-11 mx-auto">
          <Heading title="Upload Image">
            <TopRowBtns btn0Cb={this.goBack} showLeftBtns={true} />
          </Heading>

          <div className="row mt-3">
            <div className="col-xs-12 col-md-10 mx-auto">
              <div className="row">
                <div className="card col-12">
                  <div className="card-body">
                    <div className="row">
                      <DropZone onDrop={this.onDrop} />

                      <Cropper
                        files={this.state.files}
                        updateCropResult={this.updateCropResult}
                      />

                      <CropperPreview
                        files={this.state.files}
                        cropResult={this.state.cropResult}
                        cancelCrop={this.cancelCrop}
                        uploadImage={this.uploadImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { startUploadStoryImage }
)(PhotoUploadPage);
