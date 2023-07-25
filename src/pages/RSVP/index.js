import "bootstrap/dist/css/bootstrap.css";
// import ProjectCurrentContributions from "../../components/ProjectCurrentContributions";
import ProjectDescription from "../../components/ProjectDescription";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { useState, useEffect } from "react";
import RSVPCard from "../../components/RSVPCard";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";

export default function Project(props) {
	const [RSVPData, setRSVPData] = useState({});
	// const [incentivesData, setIncentivesData] = useState(null);
	// const [projectSuccessfullyEnded, setProjectSuccessfullyEnded] =
	// 	useState(null);
	// const [fundingDataUpdated, setFundingDataUpdated] = useState(false);
	// const [selectedIncentive, setSelectedIncentive] = useState(false);

	// const { pathname, hash, key } = useLocation();
	// var projectId = RSVPData.id || "";
	let { owner, title } = useParams();

	if (props.ownerTitle) {
		// if ownerTitle is provided as a prop in few exceptions usually made to make the url shorter
		({ owner, title } = props.ownerTitle);
	} else {
		// if ownerTitle is not provided, get owner and title from the URL params
		title = title.replace(/-/g, " ");
	}

	// useEffect(() => {
	// 	if (projectId !== "") {
	// 		axios
	// 			.get(process.env.REACT_APP_BASE_URL + `/api/incentives/${projectId}/`)
	// 			.then((response) => {
	// 				if (response.status === 200)
	// 					setIncentivesData(response.data.incentives);
	// 			});
	// 	}
	// }, [projectId]);

	useEffect(() => {
		// if (pathname.includes("projects") || props.ownerTitle !== null) {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/rsvp/${title}/`)
			.then((response) => {
				if (
					response.status === 200 &&
					response.data.owner_username.toLowerCase() ===
						owner.toLowerCase().replaceAll("-", " ")
				) {
					console.log(response.data);
					setRSVPData(response.data);
				}
			})
			.catch((response) => window.alert(response.message));
		// } else {
		// 	projectId = pathname.split("/").pop();
		// 	axios
		// 		.get(process.env.REACT_APP_BASE_URL + `/api/project/${projectId}/`)
		// 		.then((response) => {
		// 			setRSVPData(response.data);
		// 			if (!response.data.live && response.data.raised_amount === 0) {
		// 				// means no funding data
		// 				setFundingDataUpdated(true);
		// 			}
		// 		})
		// 		.catch((response) => window.alert(response.message));
		// }
	}, []);
	return (
		<div className="post">
			{RSVPData.title ? (
				<div>
					<RSVPCard RSVPData={RSVPData} />
					{RSVPData.live && (
						<ProjectDescription
							description={RSVPData.description}
							ownerId={RSVPData.owner}
							ownerUsername={RSVPData.owner_username}
							ownerProfilePicture={RSVPData.owner_profile_picture}
							projectId={RSVPData.id}
							projectLive={RSVPData.live}
							RSVPData={RSVPData}
						/>
					)}
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
