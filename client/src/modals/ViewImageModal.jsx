import React from "react";
import Modal from "react-bootstrap4-modal";

const ViewImageModal = ({ data, onHide }) => {
  const onDeleteImage = () => {
    console.log(data);
  };

  return (
    <Modal visible={true} onClickBackdrop={onHide} dialogClassName="modal-lg">
      <div className="modal-header">
        <button type="button" className="close" onClick={onHide}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {data && <img className="img-fluid" src={data.downloadURL} />}
      </div>

      <div className="modal-footer">
        <button className="btn btn-danger" onClick={onDeleteImage}>
          Delete
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewImageModal;
