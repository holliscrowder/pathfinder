import CreatePathCard from "./CreatePathCard";
import PathCard from "./PathCard";

export default function PathCardList({goals, setGoals, deleteGoal}){
    console.log(goals)
    return (
        <div className = "path_card_list">
            <ul className = "cards">
                <CreatePathCard />
                {goals
                    .map((goal) => {
                        return (
                            <PathCard
                                key = {goal.id}
                                goal = {goal}
                                deleteGoal = {deleteGoal}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}