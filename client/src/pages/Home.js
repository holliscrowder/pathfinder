import React from "react";
import { useOutletContext } from "react-router-dom";
import Signup from "./Signup";
import HomescreenMessage from "../components/HomescreenMessage";
import "./Home.css";

function Home() {
  const [user, setUser, isLoggedIn, handleLogout, questions] = useOutletContext();

    return (
      <div className = "homescreen_container">
        {isLoggedIn? 
          <>
          <div className = "parent_welcome_container">
            <div className = "welcome_container">
                <HomescreenMessage className = "homescreen_message"/>
            </div>
          </div>
          </> : 
          <>
          <div className = "parent_welcome_container">
            <div className = "welcome_container">
              <HomescreenMessage className = "homescreen_message"/>
              <Signup className="signup_component"/>
            </div>
          </div>
          </>
          }
      </div>
    )
}

export default Home;
