import React from "react";

const Accordion = ({ data, children }) => {
  const { title1, title2, title3, cardBody1 } = data;
  return (
    <div className="accordion" id="accordionExample">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {title1}
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <p>{cardBody1}</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              {title2}
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div className="card-body">{children}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              {title3}
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">Anim pariatur cliche reprehenderit</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
