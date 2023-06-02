import SideBar from "../../../components/DashboardSideBare";
import "./profile.scss";
import PhoneInput from "react-phone-input-2";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useAxios from "../../../utils/useAxios/useAxios";
import validator from "validator";
import { Image, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UploadButton from "../../../components/UploadButton";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Button from "react-bootstrap/Button";

export default function DashboardProfile(props) {
	const location = useLocation();
	const [userData, setUserData] = useState({});
	const [errors, setErrors] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const userProfileImage = useRef(null);

	let api = useAxios({
		headers: {
			"content-type": "multipart/form-data",
		},
	});

	useEffect(() => {
		api.get("/api/user/profile_info/").then((response) => {
			setUserData(response.data);
		});
	}, []);

	const handleChanges = (event) => {
		const { name, value } = event.target;
		let tmp = { ...formErrors };
		delete tmp[name];
		setFormErrors({ ...tmp });
		if (userData) {
			if (name === "profile_picture") {
				setUserData({
					...userData,
					[name]: [userProfileImage.current.files[0]],
				});
			} else {
				setUserData({
					...userData,
					[name]: value,
				});
			}
		}
	};

	const saveProfile = () => {
		document.getElementById("save-btn").disabled = "true";
		if (Object.keys(formErrors).length > 0) {
			setSubmitted(!submitted);
		}
		let tmp = userData;
		if (userData.phone !== "" && !`${userData.phone}`.includes("+")) {
			tmp = { ...tmp, phone: `+${userData.phone}` };
		}

		setUserData({ ...tmp });
		if (!tmp.username) {
			setFormErrors({
				...useAxios,
				email: "Email required",
			});
			document.getElementById("save-btn").disabled = "false";
			return;
		}

		if (!tmp.email) {
			setFormErrors({
				...useAxios,
				email: "Email required",
			});
			document.getElementById("save-btn").disabled = "false";
			return;
		}
		api
			.get(
				process.env.REACT_APP_BASE_URL + `/api/unique/username/${tmp.username}/`
			)
			.then((response) => {
				if (!response.data || !response.data.valid) {
					setFormErrors({
						...useAxios,
						username: "Username already exists",
					});
				}
			})
			.then(() => {
				api
					.get(
						process.env.REACT_APP_BASE_URL + `/api/unique/email/${tmp.email}/`
					)

					.then((response) => {
						if (!response.data || !response.data.valid) {
							setFormErrors({
								...useAxios,
								email: "Email already exists",
							});
						}
					})
					.then(() => {
						setSubmitted(!submitted);
					});
			});
		document.getElementById("save-btn").disabled = "false";
	};

	useEffect(() => {
		if (Object.keys(userData).length > 0 && submitted) {
			document.getElementById("save-btn").disabled = true;
			if (Object.keys(formErrors).length === 0) {
				if (
					userData.profile_picture &&
					typeof userData.profile_picture === "string"
				) {
					delete userData["profile_picture"];
				}
				console.log(userData);
				api.put("/api/user/update/", userData).then((response) => {
					if (response.status === 200) {
						document.getElementById("save-btn").disabled = false;
						window.alert("Account Updated");
					}
				});
			} else {
				window.alert("Error");
			}
			document.getElementById("save-btn").disabled = false;
		}
	}, [submitted]);

	const getUrlFromFile = () => {
		const [file] = userData.profile_picture;
		if (file) {
			let tmp_url = URL.createObjectURL(file);
			return tmp_url;
		}
	};

	return (
		<div className="dashboard-profile">
			{location.pathname === "/dashboard/profile" ||
			location.pathname === "/dashboard" ? (
				<SideBar />
			) : null}
			<div className="dashboard-profile-container">
				{userData && Object.keys(userData).length > 0 ? (
					<div className="row" style={{ width: "100%" }}>
						<div className="col-md-5 border-right">
							<div className="d-flex flex-column align-items-center text-center p-3 py-5">
								<div>
									<div
									// style={{ position: "relative" }}
									>
										<Avatar
											style={{ width: 150, height: 150 }}
											src={
												<Image
													id="avatar-image"
													src={
														userData &&
														userData.profile_picture &&
														typeof userData.profile_picture === "string"
															? userData.profile_picture
															: userData && userData.profile_picture
															? getUrlFromFile()
															: "https://rarefnd-bucket.s3.us-east-2.amazonaws.com/users/avatar.jpg"
													}
													style={{ width: 150, height: 150 }}
												/>
											}
										/>
										<div>
											{
												<div>
													<label htmlFor="fileUpload" className="centerDiv">
														<EditOutlined
															style={{
																cursor: "pointer",
																color: "#cd77d3",
															}}
														/>{" "}
														<p
															style={{
																margin: "0",
																padding: "0",
																cursor: "pointer",
																textDecoration: "underline",
																color: "#cd77d3",
															}}
														>
															change avatar
														</p>
													</label>
													<input
														hidden
														id="fileUpload"
														name="profile_picture"
														type="file"
														accept=".png, .jpeg, .jpg"
														ref={userProfileImage}
														onChange={handleChanges}
													/>
												</div>
											}
										</div>
									</div>
								</div>
								<br />
								<span className="font-weight-bold">
									@{userData && userData.username}
								</span>
								<span className="text-black-50">
									{userData && userData.email}
								</span>
							</div>
						</div>
						<div className="col-md-7 border-right">
							<div className="p-3 py-5">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4 className="text-right">Profile Settings</h4>
								</div>
								<div className="row mt-2">
									<div className="col-md-6">
										<label className="labels">
											First name<span className="required-asterisk">*</span>
										</label>
										<input
											name="first_name"
											type="text"
											className="form-control"
											value={userData && userData.first_name}
											onChange={handleChanges}
										/>
									</div>
									<div className="col-md-6">
										<label className="labels">
											Last name<span className="required-asterisk">*</span>
										</label>
										<input
											name="last_name"
											type="text"
											className="form-control"
											value={userData && userData.last_name}
											onChange={handleChanges}
										/>
									</div>
								</div>

								<div className="row mt-2">
									<div className="col-md-6">
										<label className="labels">
											Email<span className="required-asterisk">*</span>
										</label>
										<input
											name="email"
											type="text"
											className="form-control"
											value={userData && userData.email}
											onChange={handleChanges}
										/>
										<p id="email-validity" className="invalid-input-p">
											{formErrors.email}
										</p>
									</div>
									<div className="col-md-6">
										<label className="labels">
											Username<span className="required-asterisk">*</span>
										</label>
										<input
											disabled
											name="username"
											type="text"
											className="form-control"
											value={userData && userData.username}
											onChange={handleChanges}
										/>
										<p id="username-validity" className="invalid-input-p">
											{formErrors.username}
										</p>
									</div>
								</div>
								<div className="row mt-2">
									<div className="col-md-12">
										<label className="labels">
											Bio<span className="required-asterisk">*</span>
										</label>
										<textarea
											className="form-control"
											name="bio"
											type="text"
											value={userData && userData.bio}
											onChange={handleChanges}
										></textarea>
									</div>
								</div>

								<div className="row mt-3">
									<div className="col-md-12">
										<label className="labels">Mobile Number</label>
										<PhoneInput
											id="phonenumber"
											name="phone"
											inputStyle={{ width: "100%" }}
											value={userData && userData.phone}
											onChange={(value) => {
												const isValidPhoneNumber =
													validator.isMobilePhone(value);
												const phone = "phone";
												if (!isValidPhoneNumber) {
													setFormErrors({
														...errors,
														phone: "Invalid phone number",
													});
												} else if (formErrors["phone"]) {
													let tmp = { ...formErrors };
													delete tmp[phone];
													setFormErrors({ ...tmp });
												}
												setUserData({
													...userData,
													phone: `${value}`,
												});
											}}
											inputProps={{
												name: "phone",
												// required: true,
												autoFocus: true,
											}}
										/>
										<p id="phone-number-validity" className="invalid-input-p">
											{formErrors.phone}
										</p>
									</div>
								</div>
								<div className="mt-5 text-center">
									<Button
										type="button"
										onClick={saveProfile}
										id="save-btn"
										disabled={false}
									>
										Save Profile
									</Button>
									{/* <button
										// className="btn profile-button"
										type="button"
										onClick={saveProfile}
										id="save-btn"
										disabled={false}
										style={{
											color:
												"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
											radius: "12px",
										}}
									>
										Save Profile
									</button> */}
								</div>
							</div>
						</div>
					</div>
				) : (
					<LoadingSpinner color="#cd77d3" />
				)}
			</div>
		</div>
	);
}
