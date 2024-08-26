import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";
// import "./PathCard.css";

export const NewPathForm = () => {
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

    const [errorMessage, setErrorMessage] = useState('');

    const statusOptions = [
        {key: "0", value: "Path Status", label: "Path Status"},
        {key: "1", value: "Not Started", label: "Not Started"},
        {key: "2", value: "In Progress", label: "In Progress"},
        {key: "3", value: "Completed", label: "Completed"}
    ];

    const topicOptions = [
        {key: "0", value: "Career", label: "Career"},
        {key: "1", value: "Financial", label: "Financial"},
        {key: "2", value: "Health & Fitness", label: "Health & Fitness"},
        {key: "3", value: "Personal", label: "Personal"},
        {key: "4", value: "Hobbies & Leisure", label: "Hobbies & Leisure"},
        {key: "5", value: "Spiritual", label: "Spiritual"},
        {key: "6", value: "Community", label: "Community"},
        {key: "7", value: "Other", label: "Other"}
    ];

    /* add password confirm function */
    function equalTo(ref, msg) {
        return yup.mixed().test({
          name: 'equalTo',
          exclusive: false,
          message: msg || '${path} must be the same as ${reference}',
          params: {
            reference: ref.path,
          },
          test: function(value) {
            return value === this.resolve(ref);
          },
        });
      }
      yup.addMethod(yup.string, 'equalTo', equalTo);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter title").max(50),
        description: yup.string().required("Must enter valid description").max(300),
        status: yup.string().required("Must choose status."),
        topic: yup.string().required("Must choose topic.")
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            status: "",
            topic: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            fetch("/api/goals", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.user_status || "Network request not ok.")
                    })
                }
                
                return response.json()

            }).then((data) => {
                fetchGoals();
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message || "Invalid username. Please try again.")
            });
        },
    });

    return (
        <div>
            <form onSubmit = {formik.handleSubmit}>
                <input 
                    id = "title"
                    name = "title"
                    placeholder = "new path title"
                    onChange = {formik.handleChange}
                    value = {formik.values.title}
                />
                <p style = {{ color: "red" }}> {formik.errors.title}</p>
                <br />
                <input 
                    id = "description"
                    name = "description"
                    placeholder = "new path description"
                    onChange = {formik.handleChange}
                    value = {formik.values.description}
                    onBlur={formik.handleBlur}
                />
                <p style = {{ color: "red" }}> {formik.errors.description}</p>
                <br />
                <select 
                    id = "status"
                    name = "status"
                    placeholder = "status"
                    onChange = {formik.handleChange}
                    value = {formik.values.status}
                >
                    {statusOptions.map((option) => (
                        <option key = {option.key} value = {option.value} label = {option.label}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p style = {{ color: "red" }}> {formik.errors.status}</p>
                <br/>
                <select 
                    id = "topic"
                    name = "topic"
                    placeholder = "topic"
                    onChange = {formik.handleChange}
                    value = {formik.values.topic}
                >
                    {topicOptions.map((option) => (
                        <option key = {option.key} value = {option.value} label = {option.label}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p style = {{ color: "red" }}> {formik.errors.topic}</p>
                <br />
                <button type = "submit">Create Path</button>
            </form>
            {errorMessage && <div className = "error-message">{errorMessage}</div>}
        </div>
    )

}