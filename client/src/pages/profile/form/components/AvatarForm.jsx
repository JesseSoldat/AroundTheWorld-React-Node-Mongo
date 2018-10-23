import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// actions
import { startUploadAvatarImage } from "../../../../actions/imageActions";

class AvatarForm extends Component {
  state = {
    files: [],
    cropResult: null,
    image: {}
  };

  // drop file and crop
  onDrop = files =>
    this.setState({
      files
    });

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

  // api call
  uploadImage = () => this.props.startUploadAvatarImage(this.state.image);

  render() {
    return (
      <div className="col-xs-12 col-md-8 mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="card col-12">
                <h4 className="p-3">Avatar</h4>

                <ul className="list-group mb-3">
                  <li className="list-group-item">
                    <div className="col-12">
                      <div className="imageUploadCard">
                        <div className="d-flex flex-column align-items-center">
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
                          <div className="dropdown-divider" />
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="list-group-item">
                    <div className="col-12">
                      <div className="imageUploadCard">
                        <div className="text-center d-flex flex-column align-items-center">
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
                                aspectRatio={1}
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
                  </li>
                  <li className="list-group-item">
                    <div className="col-12">
                      <div className="imageUploadCard">
                        <div className="text-center">
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
                              <div className="mt-2">
                                <button
                                  onClick={this.cancelCrop}
                                  className="btn btn-danger mr-2"
                                >
                                  Cancel
                                </button>
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
                  </li>
                </ul>
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
  { startUploadAvatarImage }
)(AvatarForm);
