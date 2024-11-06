import React from "react";
import "./login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
function loginpage() {
    const handleSubmit = async () => {
        await signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif" alt="logo" style={{width:"200px", height:"100px"}}/>
        <button onClick={handleSubmit} className="btn-login">
          Login to continue
        </button>
      </div>
    </div>
  );
}

export default loginpage;