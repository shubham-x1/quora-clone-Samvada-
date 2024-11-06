import React from "react";
import "./css/Boxcomponent.css";

function Boxcomponent() {
  return (
    <div className="outer">
      <div className="inner">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-ti-1737435-100-jxcfmjdvwvpkcketifttdmeeimxcatua.jpeg"
          alt=""
        />
        <div className="title" style={{margin:"-40px 0 0 40px"}}>
          <h5 >AI in Buisness systems</h5>
          <h5>Cyber Security through Blockchain</h5>
        </div>
      </div>
    </div>
  );
}

export default Boxcomponent;
