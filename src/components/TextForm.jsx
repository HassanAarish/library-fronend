import React, { useState } from "react";
import PropTypes from "prop-types";

const TextForm = (props) => {
  const [text, setText] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleClear = () => {
    let newText = "";
    setText(newText);
  };

  const handleInverseClick = () => {
    let newText = "";
    for (let i = text.length - 1; i >= 0; i--) {
      newText += text[i];
    }
    setText(newText);
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="container">
        <h2>{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="5"
          ></textarea>
        </div>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={handleLowClick}
        >
          Convert to Lowercase
        </button>
        <button className="btn btn-outline-primary mx-2" onClick={handleClear}>
          Clear Text
        </button>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={handleInverseClick}
        >
          Inverse Text
        </button>
        <button className="btn btn-outline-danger mx-2" onClick={speak}>
          Speak
        </button>
      </div>
      <div className="container my-3">
        <h3>Your text Summary</h3>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes to read</p>
        <h3>Preview</h3>
        <p>{text}</p>
      </div>
    </>
  );
};

TextForm.propTypes = {
  heading: PropTypes.string.isRequired,
};
TextForm.defaultProps = { heading: "Enter The Text to Analyze Below" };

export default TextForm;
