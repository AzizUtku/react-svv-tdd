import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  leftText: PropTypes.string.isRequired,
};

const Input = (props) => {
  const { value, onChange, leftText } = props;
  return (
    <div className="form-group">
      <span>{leftText}</span>
      <input
        className="form-field"
        type="text"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

Input.propTypes = propTypes;
export default Input;
