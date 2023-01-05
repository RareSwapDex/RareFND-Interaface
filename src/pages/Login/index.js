import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./index.css";
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { Modal, message, Input } from "antd";
import axios from "axios";

const { confirm } = Modal;

const validateEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
};

export default function (props) {
	const initialValues = { email: "", password: "" };
	const { loginUser } = useContext(AuthContext);
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			document.getElementById("login-btn").disabled = true;
			loginUser(formValues.email, formValues.password);
		}
	}, [formErrors]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 8) {
			errors.password = "Password must be more than 8 characters";
		} else if (values.password.length > 30) {
			errors.password = "Password cannot exceed more than 30 characters";
		}
		return errors;
	};

	const ResetPassword = () => {
		const email = document.getElementById("password-reset-email").value;
		if (!validateEmail(email)) {
			messageApi.open({
				type: "error",
				content: "Invalid email address",
			});
		} else {
			axios.post(process.env.REACT_APP_BASE_URL + "/api/user/reset_password/", {
				email: email,
			});
			messageApi.open({
				type: "info",
				content:
					"You will receive an email from us if you have an account in our website",
				duration: 10,
			});
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Enter your email to reset your password",
			content: (
				<Input id="password-reset-email" type="email" placeholder="Email" />
			),
			onOk() {
				ResetPassword();
			},
			// onCancel() {
			// 	console.log("Cancel");
			// },
		});
	};

	return (
		<div className="Auth-form-container">
			{contextHolder}
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Login</h3>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							name="email"
							className="form-control mt-1"
							placeholder="Enter Email"
							value={formValues.email}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.email}</p>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							name="password"
							className="form-control mt-1"
							placeholder="Password"
							value={formValues.password}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password}</p>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-warning" id="login-btn">
							Login
						</button>
					</div>
					<div
						onClick={showConfirm}
						style={{
							cursor: "pointer",
							color: "blue",
							textDecoration: "underline",
						}}
					>
						<p className="text-right mt-2">Forgot password?</p>
					</div>
					<p className="text-right mt-2">
						You don't have an account? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
