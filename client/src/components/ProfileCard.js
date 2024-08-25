import { useOutletContext } from "react-router-dom";

function ProfileCard() {
    const [user, setUser, isLoggedIn] = useOutletContext();

    return (
        <>
            <div className = "profile_card">
                <p><b>username: </b> {user.username}</p>
            </div>
        </>
      );
}

export default ProfileCard;