import React, { useState } from 'react';

import {
  ExpandMore,
} from "@mui/icons-material";
import Closeicon from "@mui/icons-material/Close";
import { Avatar, Input } from "@mui/material";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import './css/qnavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userslice";
import { useDispatch, useSelector } from "react-redux";


function Qnavbar() {
  const [Modalopen, setModalopen] = useState(false)
  const [inputUrl, setinputurl] = useState("")
  const [q, setq] = useState("");
  const Close = <Closeicon />
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async ()=> {
    if (q !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: q,
        questionUrl: inputUrl,
        user:user,
      };
      await axios.post("/api/quest", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        })
        .catch((e) => {
          console.log(e);
          alert("Error in adding question");
          alert(e)
        });
    }
  };
   
  const handlelogout = () => {
    if (window.confirm("if you logout i become your father, are u sure ?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("Logged out");
        })
        .catch(() => {
          console.log("error in logout");
        });
    }
  };


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Samvada</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Following</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">People</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Notification</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="d-flex search" role="search">
            <input className="form-control me-2 inputbox" type="search" placeholder="Search" aria-label="Search" width="15px" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <span className="avatar" onClick={handlelogout}><Avatar  src={user?.photo}  /></span> 
          <button className="btn btn-primary" onClick={() => setModalopen(true)}>Add a question</button>
        </div>
      </div>
       <div className='Popup'>
      <Modal
        open={Modalopen}
        Closeicon={Close}
        onClose={() => setModalopen(false)}
        CloseonEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <div className="title" style={{height:"120px",  margin:"0 0 10px"}}>
          <h5>Add question</h5>
          <h5>Share Link</h5>
        </div>
        <div className="info">
        <Avatar className="avatar" src={user?.photo} style={{margin:"20px 0 50px"}} />
          <div className="scope">
            <p>{user?.userName}</p>
          </div>
        </div>
        <div className="Field">
          <Input value={q} onChange={(e) => setq(e.target.value)} type="text" placeholder="Enter your Question" style={{width:"500px"}}/>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="url" value={inputUrl} onChange={(e) => setinputurl(e.target.value)} placeholder="Enter Link if any"
              style={{
                margin: "5px 0",
                border: "1px solid lightgray",
                padding: "10px",
                outline: "2px solid #000",
                width:"500px",
              }}
            />
            {inputUrl !== "" && (  <img style={{ height: "40vh", objectFit: "contain" }} src={inputUrl} alt="displayimage" />
            )}
          </div>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={() => setModalopen(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit" className="add">
            Add question
          </button>
        </div>
      </Modal>
      </div>
    </nav>


  )
}

export default Qnavbar;
