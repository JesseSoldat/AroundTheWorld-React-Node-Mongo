import React from "react";
// images
import UserAvatar from "../../_images/userdefault.png";

const UserDetailsCard = ({ details }) => {
  const { avatar } = details;
  const defaultAvatar = avatar ? avatar : UserAvatar;

  return (
    <div className="row">
      <div className="col-sm-11 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12 col-md-8 mb-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="mr-2 font-weight-bold">Gender:</span>{" "}
                    {details.gender}
                  </li>
                  <li className="list-group-item">
                    <span className="mr-2 font-weight-bold">Age:</span> ?
                  </li>
                  <li className="list-group-item">
                    <span className="mr-2 font-weight-bold">Occupation:</span>{" "}
                    {details.occupation}
                  </li>
                  <li className="list-group-item">
                    <span className="mr-2 font-weight-bold">Hometown:</span>{" "}
                    {details.hometown}
                  </li>
                  <li className="list-group-item">
                    <span className="mr-2 font-weight-bold">Email:</span>{" "}
                    {details.email}
                  </li>
                  <li className="list-group-item">
                    <span className="mr-2 font-weight-bold">About:</span>{" "}
                    {details.about}
                  </li>
                </ul>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
                <img
                  src={defaultAvatar}
                  alt="avatar"
                  style={{ height: "220px" }}
                  className="img-fluid img-thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
