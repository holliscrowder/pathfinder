import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useOutletContext } from "react-router-dom";
import HomescreenMessage from "../components/HomescreenMessage";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const [user, setUser, isLoggedIn] = useOutletContext();

    return (
        <div className = "parent_login_container">
            <div className = "login_container">
                <HomescreenMessage className = "homescreen_message"/>
                <LoginForm user={user} setUser={setUser} className = "login"/>
                <div className = "signup_instead">
                <br></br>
                <p>Want to Join?</p>
                <Link to="/">Sign Up</Link>
                </div>
            </div>
        </div>
      );
}

export default Login;