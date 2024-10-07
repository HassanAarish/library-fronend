import React, { useState } from "react";
import PropTypes from "prop-types";

const TextForm = (props) => {
  const [text, setText] = useState("Enter Text Here");

  const handleUpClick = () => {
    console.log("🚀 handleUpClick was clicked");
    setText("You have clicked on Convert to Uppercase button");
  };

  const handleOnChange = () => {
    console.log("🚀 handleOnChange was fired");
  };

  return (
    <div>
      <h2>{props.heading}</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="10"
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpClick}>
        Convert to Uppercase
      </button>
    </div>
  );
};

TextForm.propTypes = {
  heading: PropTypes.string.isRequired,
};
TextForm.defaultProps = { heading: "Enter The Text to Analyze Below" };

export default TextForm;
