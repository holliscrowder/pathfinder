import { useOutletContext } from "react-router-dom";

function ProfileCard() {
    const [
        user,
        setUser,
        isLoggedIn,
        handleLogout,
        goals,
        setGoals,
        deleteGoal, 
        updateGoal,
        fetchGoals,
        createNewGoal
      ] = useOutletContext();

    return (
        <>
            <div className = "profile_card">
                <p><b>Username: </b> {user.username}</p>
                <p><b>Total Paths: </b> {goals.length}</p>
                <p><b>Paths Not Started: </b> {goals.filter((goal) => {return (goal.status === "Not Started")}).length}</p>
                <p><b>Paths In Progress: </b> {goals.filter((goal) => {return (goal.status === "In Progress")}).length}</p>
                <p><b>Paths Completed: </b> {goals.filter((goal) => {return (goal.status === "Completed")}).length}</p>
            </div>
        </>
      );
}

export default ProfileCard;