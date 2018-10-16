import React, { Component } from "react";

class MatchUsersModal extends Component {
  closeModal = () => {
    console.log("close");
  };

  closeModalAndRoute = () => {
    console.log("close and route");
  };
  render({ data }) {
    return (
      <div>
        <div className="modal-header">
          <h4 className="modal-title" id="modal-basic-title">
            You Matched {data.match.length} Users
          </h4>

          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.closeModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {data &&
          data.match.length && (
            <div className="modal-body">
              <ul className="list-group list-group-flush">
                {data.match.map(match => (
                  <li className="list-group-item">
                    <span>
                      {match.userInfo[0].username} has {match.length}{" "}
                      {match.length === 1 ? "story" : "stories"} found near your
                      location.
                    </span>
                    <br />
                    <a onClick={() => this.closeModalAndRoute(match)}>
                      Check out their stories.
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

export default MatchUsersModal;
