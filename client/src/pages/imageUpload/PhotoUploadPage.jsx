import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// common components
import Heading from "../../components/Heading";
// actions
import { startUploadStoryImage } from "../../actions/imageActions";
// css
import "./PhotoUploadPage.css";

class PhotoUploadPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  componentDidMount() {}

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") return;

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      const imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  uploadImage = () => {
    const { storyId } = this.props.match.params;
    this.props.startUploadStoryImage(this.state.image, storyId);
  };

  render() {
    return (
      <div>
        <Heading title="Upload Image" />

        <div className="row mt-3">
          <div className="col-xs-12 col-md-10 mx-auto">
            <div className="row">
              <div className="card col-12">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 my-2">
                      <div className="imageUploadCard card">
                        <div className="card-body d-flex flex-column align-items-center">
                          <h4 className="mb-4 imgUploadTitle">
                            Step 1 - Add Photo
                          </h4>
                          <div>
                            <Dropzone onDrop={this.onDrop} multiple={false}>
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

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 my-2">
                      <div className="imageUploadCard card">
                        <div className="card-body text-center d-flex flex-column align-items-center">
                          <h4 className="mb-4 imgUploadTitle">
                            Step 2 - Resize image
                          </h4>
                          <div className="cropperWrapper">
                            {this.state.files[0] && (
                              <Cropper
                                className="cropper"
                                style={{ height: 200, width: 280 }}
                                ref="cropper"
                                src={this.state.files[0].preview}
                                aspectRatio={4 / 3}
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

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 my-2">
                      <div className="imageUploadCard card">
                        <div className="card-body text-center">
                          <h4 className="mb-4 imgUploadTitle">
                            Step 3 - Preview and Upload
                          </h4>
                          {this.state.files[0] && (
                            <div>
                              <div className="finalImageWrapper">
                                <img
                                  className="previewImg"
                                  src={this.state.cropResult}
                                />
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  onClick={this.uploadImage}
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
