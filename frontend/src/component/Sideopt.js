import React from 'react';
import { Link } from 'react-router-dom';
import "./css/sideopt.css";

const Sideopt = () => {
  return (
    <div className='contents'>
      <div className="types">
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fww1.oswego.edu%2Fhistory%2F&psig=AOvVaw3-pZhZeLwqaRPhwDtgu312&ust=1728238692484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDMzfzs94gDFQAAAAAdAAAAABAE"
          alt=""
          style={{ height: "15px", width: "20px" }}
        />
        <Link to="/history">History</Link>
      </div>

      <div className="types">
        <p className="text">Discover Spaces</p>
      </div>
    </div>
  );
}

export default Sideopt;
