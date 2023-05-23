import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./index.css";
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { Modal, message, Input } from "antd";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();

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
			loginUser(formValues.email.toLowerCase(), formValues.password);
			document.getElementById("login-btn").disabled = false;
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
		});
	};

	return (
		<div className="Auth-form-container">
			{contextHolder}
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">{t("logIn.logIn")}</h3>
					<div className="form-group mt-3">
						<label>{t("logIn.emailAddress")}</label>
						<Input
							type="email"
							name="email"
							className="form-control mt-1"
							placeholder={t("logIn.enterEmailAddress")}
							value={formValues.email}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.email}</p>
					</div>
					<div className="form-group mt-3">
						<label>{t("logIn.password")}</label>
						<Input.Password
							type="password"
							name="password"
							placeholder={t("logIn.enterPassword")}
							style={{ borderRadius: "0" }}
							value={formValues.password}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password}</p>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							type="submit"
							className="btn"
							id="login-btn"
							style={{
								background:
									"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
								border: "none",
								color: "white",
							}}
						>
							{t("logIn.logIn")}
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
						<p className="text-right mt-2">{t("logIn.forgotPassword")}</p>
					</div>
					<p className="text-right mt-2">
						{t("logIn.noAccount")} <Link to="/signup">{t("logIn.signUp")}</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
