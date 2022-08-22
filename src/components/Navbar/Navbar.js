import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../contex/UserContext";
import { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Navbar(props) {

  const { user, signIn, logOut } = useContext(UserContext);

  const screenSize = window.innerWidth;

  console.log(user);

  async function signInHandlr(credential) {

    console.log(credential)
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, {
      userDetails: credential,
    });

    console.log(res)
    localStorage.setItem("jwtSwap", res.data.token);
    localStorage.setItem("userSwap",JSON.stringify( res.data.data));
    signIn(res.data.data);
  }

  function logOutHandlr() {
    localStorage.clear();
    logOut();
  }

  return (
    <div className="nav">
      <Link className="link" to="/">
        <h2>Swap</h2>
      </Link>
      <input type="text" placeholder="Search anything you want..." />

      <div className={screenSize<=450?"centerProfile":"profile"}>
        {user ? (
          <>
            <img className="profileImage" src={user?.userImage} alt="dp" />
            <button className="logOutBtn" onClick={logOutHandlr}>
              Log Out
            </button>
          </>
        ) : (
          <>

            <GoogleLogin   type={screenSize<=450?"icon":''} size={screenSize<=450?"medium":''}  

              onSuccess={(credentialResponse) => {
                signInHandlr(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
