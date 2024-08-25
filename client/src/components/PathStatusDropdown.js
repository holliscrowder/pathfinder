import React, {useState} from "react";

export default function PathStatusDropdown({updateGoal, goalId}) {
    const statusOptions = [
        {key: "0", label: "Update Status", value: "Update Status"},
        {key: "1", label: "Not Started", value: "Not Started"},
        {key: "2", label: "In Progress", value: "In Progress"},
        {key: "3", label: "Completed", value: "Completed"}
    ];

    const [status, setStatus] = useState("");

    const updateStatus = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        if (newStatus !== "Update Status") {
            updateGoal(goalId, newStatus);
        };
    }

    return(
        <div>
            <label>
                <select
                    value = {status}
                    onChange = {updateStatus}
                    >
                        {statusOptions.map((option) => (
                            <option 
                                key = {option.key}
                                value = {option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                </select>
            </label>
        </div>
    )
}