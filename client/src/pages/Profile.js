import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser, isLoggedIn] = useOutletContext();
    const [isUpdated, setIsUpdated] = useState(false);

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const toggleShowUpdateProfile = () => {
      setShowUpdateProfile(!showUpdateProfile);
    };

    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const toggleShowUpdatePassword = () => {
      setShowUpdatePassword(!showUpdatePassword);
    };

    useEffect(() => {
        fetch("/api/check_session")
          .then((response) => {
            if (response.status == 200) {  
              return response.json()
            } else {
              throw response
            }
          })
          .then((data) => {
            setUser(data)
        
          })
          .catch(e => {
          });
      }, []);


if (isUpdated === false) {
    return (
        <>
          <p>Profile</p>
        </>
      );
    }
  else if (!user) {
    return (
      <div>
        <p>Whoops! Something went wrong.</p>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default Profile;