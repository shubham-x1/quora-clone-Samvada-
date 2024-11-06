import React from "react";
import Boxcomponent from "./Boxcomponent";
import "./css/Box.css";

function Box() {
  return (
    <div className="frame">
      <div className="header">
        <h5>Space to follow</h5>
      </div>
      <div className="contents">
        <Boxcomponent/>
      </div>
    </div>
  );
}

export default Box;

