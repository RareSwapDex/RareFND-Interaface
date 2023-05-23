import { useState, useEffect, useContext, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./index.css";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { ProviderContext } from "../../web3/ProviderContext";
import { Link } from "react-router-dom";
import DialogPopup from "../../components/DialogPopup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

var regexp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
function isValidPhonenumber(value) {
	if (!value) return false;
	return regexp.test(value.replace(/[\s()+\-\.]|ext/gi, ""));
}

export default function () {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	const initialValues = { email: "", password: "" };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [accountCreated, setAccountCreated] = useState(false);
	const [realTimeFormErrors, setRealTimeFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [walletAddress, setWalletAddress] = useState();
	const { provider, setProvider } = useContext(ProviderContext);
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);
	const navigate = useNavigate();
	const { t } = useTranslation();

	const getWalletAddress = async () => {
		const accounts = await provider.listAccounts();
		if (accounts) setWalletAddress(accounts[0]);
	};

	useEffect(() => {
		if (provider) getWalletAddress();
	}, [provider]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors({ ...realTimeFormErrors, ...validate(formValues) });
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			document.getElementById("sign-up-btn").disabled = true;
			axios
				.post(process.env.REACT_APP_BASE_URL + "/api/user/signup/", {
					username: formValues.username,
					email: formValues.email,
					password: formValues.password,
					first_name: formValues.firstname,
					last_name: formValues.lastname,
					phone: formValues.phone ? "+" + formValues.phone : "",
					wallet_address: formValues.walletAddress,
				})
				.then((response) => {
					if (response.status === 200) {
						setAccountCreated(true);
					}
				});
		}
	}, [formErrors]);

	useEffect(() => {
		if (formValues.username) {
			axios
				.get(
					process.env.REACT_APP_BASE_URL +
						`/api/unique/username/${document.getElementById("username").value}/`
				)
				.then(function (response) {
					if (!response.data.valid) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							username: t("signUp.usernameExists"),
						});
					} else if (
						document.getElementById("username") &&
						document.getElementById("username").value.length < 5
					) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							username: t("signUp.username5Chars"),
						});
					} else if (
						document.getElementById("username") &&
						document.getElementById("username").value.length > 20
					) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							username: t("signUp.usernameMoreThan20"),
						});
					} else {
						delete realTimeFormErrors.username;
						forceUpdate();
					}
				});
		}
	}, [formValues]);

	useEffect(() => {
		if (formValues.email) {
			axios
				.get(
					process.env.REACT_APP_BASE_URL +
						`/api/unique/email/${document.getElementById("email").value}/`
				)
				.then(function (response) {
					if (!response.data.valid) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							email: t("signUp.emailExists"),
						});
					} else if (!regex.test(document.getElementById("email").value)) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							email: t("signUp.notValidEmailFormat"),
						});
					} else {
						delete realTimeFormErrors.email;
					}
				});
		}
	}, [formValues.email]);

	const validate = (values) => {
		const errors = {};

		if (!values.username) {
			errors.username = "Username is required!";
		} else if (values.username.length < 5) {
			errors.username = "Username must be more than 5 characters";
		} else if (values.username.length > 20) {
			errors.username = "Username cannot exceed more than 20 characters";
		}

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

		if (values.password !== values.password2) {
			errors.password2 = "Password confirmation doesn't match with password";
		}

		if (values.phone && !isValidPhonenumber(values.phone)) {
			errors.phone = "Invalid phone number";
		}

		if (walletAddress)
			setFormValues({ ...formValues, walletAddress: walletAddress });
		// else errors.walletAddress = "Please connect using your wallet";
		else setFormValues({ ...formValues, walletAddress: null });

		return errors;
	};

	return (
		<div className="Sign-Up-Auth-form-container p-5">
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">{t("signUp.signUp")}</h3>
					<div className="form-group mt-3">
						<label>
							{t("signUp.userName")} <span className="text-danger">*</span>
						</label>
						<input
							id="username"
							name="username"
							className="form-control mt-1"
							placeholder={t("signUp.enterUserName")}
							value={formValues.username}
							onChange={handleChange}
						/>
						<p className="text-danger">{realTimeFormErrors.username}</p>
					</div>
					<div className="form-group mt-3">
						<label>
							{t("signUp.emailAddress")} <span className="text-danger">*</span>
						</label>
						<input
							id="email"
							type="email"
							name="email"
							className="form-control mt-1"
							placeholder={t("signUp.enterEmailAddress")}
							value={formValues.email}
							onChange={handleChange}
						/>
						<p className="text-danger">{realTimeFormErrors.email}</p>
					</div>
					<div className="form-group mt-3">
						<label>
							{t("signUp.password")} <span className="text-danger">*</span>
						</label>
						<input
							type="password"
							name="password"
							className="form-control mt-1"
							placeholder={t("signUp.enterPassword")}
							value={formValues.password}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password}</p>
					</div>
					<div className="form-group mt-3">
						<label>
							{t("signUp.confirmPassword")}{" "}
							<span className="text-danger">*</span>
						</label>
						<input
							type="password"
							name="password2"
							className="form-control mt-1"
							placeholder={t("signUp.confirmPassword")}
							value={formValues.password2}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password2}</p>
					</div>

					<div className="d-grid gap-2 mt-3">
						<button
							type="submit"
							className="btn"
							id="sign-up-btn"
							style={{
								background:
									"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
								border: "none",
								color: "white",
							}}
						>
							{t("signUp.signUp")}
						</button>
					</div>
					<p className="forgot-password text-right mt-2">
						{t("signUp.haveAnAccount")}{" "}
						<Link to="/login">{t("signUp.login")}</Link>
					</p>
				</div>
			</form>
			{accountCreated && (
				<DialogPopup
					title={t("signUp.verifyEmail")}
					description={t("signUp.verifyEmailParagraph")}
					show={true}
					function_={() => {
						setAccountCreated(false);
						navigate(-1);
					}}
				/>
			)}
		</div>
	);
}
