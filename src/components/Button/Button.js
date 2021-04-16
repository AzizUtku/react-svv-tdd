import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  isIcon: PropTypes.bool,
};

const defaultProps = {
  className: "",
  isIcon: false,
};

const Button = ({ onClick, isIcon, children, className }) => (
  <div className={`box-button ${className}`} onClick={onClick}>
    <a href="#" className={`btn ${isIcon ? "icon-btn" : ""}`}>
      {children}
    </a>
  </div>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
