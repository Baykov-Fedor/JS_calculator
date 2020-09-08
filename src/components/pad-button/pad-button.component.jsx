import React from "react";

import "./pad-button.styles.scss";

const Button = (props) => (
  <button
    className={`pad-button ${props.class}`}
    id={props.id}
    onClick={props.numFunc ? () => props.numFunc(props.value) : props.func}
  >
    {props.children}
  </button>
);

export default Button;
