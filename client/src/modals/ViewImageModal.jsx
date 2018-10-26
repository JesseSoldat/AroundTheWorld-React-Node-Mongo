import React from "react";
import Modal from "react-bootstrap4-modal";

const ViewImageModal = ({ data, onHide, deleteImgFromStory = null }) => {
  const onDeleteImage = () => {
    deleteImgFromStory(data);
  };

  return (
    <Modal visible={true} onClickBackdrop={onHide} dialogClassName="modal-lg">
      <div className="modal-body">
        {data && (
          <img
            className="img-fluid mx-auto d-block"
            src={data.downloadURL}
            alt="detail preview"
          />
        )}
      </div>

      <div className="modal-footer">
        {deleteImgFromStory && (
          <button className="btn btn-danger" onClick={onDeleteImage}>
            Delete
          </button>
        )}

        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewImageModal;
