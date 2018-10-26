import React from "react";
import { Link } from "react-router-dom";
import logo from "../../_images/aroundTheWorldLogo.png";
import ShowHide from "../../components/ShowHide";

const Welcome = () => {
  return (
    <div className="container">
      <div className="spacer200" />

      <div className="row">
        <div className="col-sm-10 col-md-6 mx-auto d-flex flex-column justify-content-center">
          <img className="img-fluid" src={logo} alt="around the world" />

          <div>
            <ShowHide size="xs">
              <div className="col-12 mx-auto mt-5 ">
                <Link to="/login">
                  <button className="btn btn-primary btn-sm btn-block mr-3 mb-3">
                    <i
                      style={{ color: "white" }}
                      className="fas fa-sign-in-alt mr-1"
                    />
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-secondary btn-sm btn-block mr-3">
                    <i className="fas fa-edit mr-1" /> Register
                  </button>
                </Link>
              </div>
            </ShowHide>

            <ShowHide size="sm-xl">
              <div className="col-12 mx-auto mt-5 d-flex justify-content-center">
                <Link to="/login">
                  <button className="btn btn-primary mr-3">
                    <i
                      style={{ color: "white" }}
                      className="fas fa-sign-in-alt mr-1"
                    />
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="btn btn-secondary mr-3">
                    <i className="fas fa-edit mr-1" /> Register
                  </button>
                </Link>
              </div>
            </ShowHide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
