import SideBar from "../../../components/DashboardSideBare";
import DialogPopup from "../../../components/DialogPopup";
import "./profile.scss";
import PhoneInput from "react-phone-input-2";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../../../utils/useAxios/useAxios";

export default function DashboardProfile() {
	const location = useLocation();
	const [userData, setUserData] = useState({});
	let api = useAxios();

	useEffect(() => {
		api.get("/api/user/profile_info/").then((response) => {
			setUserData(response.data);
		});
	}, []);

	const handleChanges = (event) => {
		const { name, value } = event.target;
		if (userData) {
			setUserData({
				...userData,
				[name]: value,
			});
		}
	};

	const saveProfile = () => {
		let tmp = userData;
		if (!`${userData.phone}`.includes("+")) {
			tmp = { ...tmp, phone: `+${userData.phone}` };
		}

		api.put("/api/user/update/", tmp).then((response) => {
			if (response.status === 200) {
				window.alert("Account Updated");
				// <DialogPopup
				// 	title="Account Updated"
				// 	description="Your account information have been updated successfully"
				// 	show={true}
				// 	// function_={() => setAccountCreated(false)}
				// />;
				// console.log("fjluisdhfjoiadjhfugyks");
			}
		});
	};

	return (
		<div className="dashboard-profile">
			{location.pathname !== "/dashboard/projects" && <SideBar />}
			<div className="dashboard-profile-container">
				<div className="row" style={{ width: "100%" }}>
					<div className="col-md-5 border-right">
						<div className="d-flex flex-column align-items-center text-center p-3 py-5">
							<img
								className="rounded-circle mt-5"
								width="150px"
								src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
							/>
							<span className="font-weight-bold">
								@{userData && userData.username}
							</span>
							<span className="text-black-50">
								{userData && userData.email}
							</span>
							<span> </span>
						</div>
					</div>
					<div className="col-md-7 border-right">
						<div className="p-3 py-5">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h4 className="text-right">Profile Settings</h4>
							</div>
							<div className="row mt-2">
								<div className="col-md-6">
									<label className="labels">Name</label>
									<input
										name="first_name"
										type="text"
										className="form-control"
										value={userData && userData.first_name}
										onChange={handleChanges}
									/>
								</div>
								<div className="col-md-6">
									<label className="labels">last name</label>
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
									<label className="labels">Email</label>
									<input
										name="email"
										type="text"
										className="form-control"
										value={userData && userData.email}
										onChange={handleChanges}
									/>
								</div>
								<div className="col-md-6">
									<label className="labels">Username</label>
									<input
										name="username"
										type="text"
										className="form-control"
										value={userData && userData.username}
										onChange={handleChanges}
									/>
								</div>
							</div>

							<div className="row mt-3">
								<div className="col-md-12">
									<label className="labels">Mobile Number</label>
									<PhoneInput
										id="phonenumber"
										name="phone"
										classNameName="mt-1"
										inputStyle={{ width: "100%" }}
										value={userData && userData.phone}
										onChange={(value) =>
											setUserData({
												...userData,
												phone: `${value}`,
											})
										}
										inputProps={{
											name: "phone",
											// required: true,
											autoFocus: true,
										}}
									/>
								</div>
							</div>
							<div className="mt-5 text-center">
								<button
									className="btn btn-primary profile-button"
									type="button"
									onClick={saveProfile}
								>
									Save Profile
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
