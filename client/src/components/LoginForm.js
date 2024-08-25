import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({user, setUser}) => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        password: yup.string().required("Must enter password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.email_status || 'Network response was not ok');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setUser(data)
                navigate("/profile");
            })
            .catch((error) => {
                setErrorMessage(error.message || 'An error occurred. Please try again later.');
            });
        },
    });

    return (
        <>
            <div className = "login">
                <form onSubmit = {formik.handleSubmit}>
                    <br />
                    <input
                        id = "username"
                        name = "username"
                        placeholder = "username"
                        onChange = {formik.handleChange}
                        value = {formik.values.username}
                    />
                    <p style = {{ color: "red" }}> {formik.errors.username}</p>
                    <br />
                    <input
                        id = "password"
                        name = "password"
                        placeholder = "password"
                        onChange = {formik.handleChange}
                        value = {formik.values.password}
                        type = "password"
                    />
                    <p style = {{ color: "red" }}> {formik.errors.password}</p>
                    <br />
                    <button type = "submit">Login</button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </>
    )
}