import React from "react";

import "./display.styles.scss";

const Display = (props) => {
  return (
    <div className="display">
      <div className="display--all-nums">{props.display}</div>
      <div className="display--current-number" id="display">
        {props.currentNumber}
      </div>
    </div>
  );
};

export default Display;
