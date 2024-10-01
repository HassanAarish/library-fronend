import React from "react";
import PropTypes from "prop-types";

const TextForm = (props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
      <div class="mb-3">
        <textarea
          type="text"
          class="form-control"
          id="myBox"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};

export default TextForm;
