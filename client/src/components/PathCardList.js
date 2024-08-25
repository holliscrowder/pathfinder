import PathCard from "./PathCard";

export default function PathCardList({goals, setGoals}){
    console.log(goals)
    return (
        <div className = "path_card_list">
            <ul className = "cards">
                {goals
                    .map((goal) => {
                        return (
                            <PathCard
                                key = {goal.id}
                                goal = {goal}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}