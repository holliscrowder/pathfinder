import React from "react";
import { SignupForm } from "../components/SignupForm";
import { useOutletContext, Link } from "react-router-dom";

function Signup() {
    const [user, setUser] = useOutletContext();

    return (
        <>
        <br></br>
        <div className = "signup_header">
            <h2>Want to join? Sign up below!</h2>
            <p>Enter a valid email and choose a username.</p>
        </div>
        <main>
            <SignupForm user={user} setUser={setUser} className = "signup"/>
        </main>
        <br></br>
        <div className = "login_instead">
            <p>Already a member?</p>
            <Link to="/login">Login</Link>
        </div>
        </>
      );
}

export default Signup;