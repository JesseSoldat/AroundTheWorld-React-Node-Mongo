import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class PhotoUploadPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

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

  uploadImage = () => {};

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-10 col-lg-8 mx-auto">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <Dropzone onDrop={this.onDrop} multiple={false}>
                <div style={{ paddingTop: "30px", textAlign: "center" }}>
                  <Icon name="upload" size="huge" />
                  <Header content="Drop image here or click to upload" />
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoUploadPage;
