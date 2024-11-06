import logo from './logo.svg';
import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import Quora from './component/quora';
import Login from './component/auth/loginpage';
import Sideopt from './component/Sideopt'; // Import Sideopt
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./feature/userslice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import HistoryMain from './component/historypage/historymain';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
 
  return (
    <Router> 
      <div className='struct'>
        {user ? (
          <>
            <Sideopt />
            <Routes>
              <Route path="/" element={<Quora />} />
              <Route path="/history" element={<HistoryMain />}  />
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
