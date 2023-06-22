import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Image, Avatar } from "antd";

export default function PublicProfile() {
	const profileUsername = window.location.href.split("/").at(-1);
	const [profileInfo, setProfileInfo] = useState(null);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/profile/${profileUsername}/`)
			.then((response) => {
				if (response.status === 200) {
					setProfileInfo(response.data);
				}
			});
	}, []);

	return (
		<div id="publicProfile">
			{profileInfo ? (
				<div>
					<div className="profileHeader">
						<div className="centerDiv">
							<Avatar
								style={{ width: 124, height: 124, marginTop: 20 }}
								src={
									<Image
										src={
											(profileInfo && profileInfo.profile_picture) ||
											"https://rarefnd-bucket.s3.us-east-2.amazonaws.com/users/avatar.jpg"
										}
										style={{ width: 124, height: 124 }}
									/>
								}
							/>
						</div>
						<div className="centerDiv">
							<h1>
								{profileInfo.username !== "dean"
									? profileInfo.username
									: "AURA SKYPOOL"}
							</h1>
						</div>
						{/* <div className="centerDiv">
							<p className="m-1">{`${
								profileInfo.first_name !== null ? profileInfo.first_name : ""
							} ${
								profileInfo.last_name !== null ? profileInfo.last_name : ""
							}`}</p>
						</div> */}
						{/* <div className="centerDiv">
							<p>{profileInfo.email}</p>
						</div> */}
						<div className="centerDiv">
							<div
								style={{
									border: " 2px solid #cd77d3",
									width: "10%",
									minWidth: "60px",
									marginBottom: "20px",
								}}
							></div>
						</div>
						<div className="centerDiv" style={{ textAlign: "center" }}>
							<div style={{ width: "500px" }}>
								<p style={{ whiteSpace: "pre-wrap" }}>{profileInfo.bio}</p>
							</div>
						</div>
					</div>
					<div className="profileProjects"></div>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
