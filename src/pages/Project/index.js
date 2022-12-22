import "bootstrap/dist/css/bootstrap.css";
import ProjectCurrentContributions from "../../components/ProjectCurrentContributions";
import ProjectDescription from "../../components/ProjectDescription";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";

export default function Project(props) {
	const [projectData, setProjectData] = useState({});
	const [incentivesData, setIncentivesData] = useState(null);
	// projectSuccessfullyEnded:
	// null: didn't succeed and didn't fail,
	// false: fundraising failed,
	// true: fundraising successfully ended)
	const [projectSuccessfullyEnded, setProjectSuccessfullyEnded] =
		useState(null);
	const [fundingDataUpdated, setFundingDataUpdated] = useState(false);

	const { pathname, hash, key } = useLocation();
	var projectId = projectData.id || "";
	let { owner, title } = useParams();
	title = title.replace(/-/g, " ");

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/incentives/${projectId}/`)
			.then((response) => {
				if (response.status === 200)
					setIncentivesData(response.data.incentives);
			});
	}, [projectId]);

	useEffect(() => {
		if (pathname.includes("projects")) {
			axios
				.get(process.env.REACT_APP_BASE_URL + `/api/projects/${title}/`)
				.then((response) => {
					console.log(
						"hahah",
						response.data.owner_username.toLowerCase(),
						owner.toLowerCase(),
						owner.toLowerCase() === response.data.owner_username.toLowerCase()
					);
					if (
						response.status === 200 &&
						response.data.owner_username.toLowerCase() ===
							owner.toLowerCase().replaceAll("-", " ")
					) {
						setProjectData(response.data);
						projectId = response.data.id;
						if (!response.data.live && response.data.raised_amount === 0) {
							// means no funding data
							setFundingDataUpdated(true);
						}
					}
				})
				.catch((response) => window.alert(response.message));
		} else {
			projectId = pathname.split("/").pop();
			axios
				.get(process.env.REACT_APP_BASE_URL + `/api/project/${projectId}/`)
				.then((response) => {
					setProjectData(response.data);
					if (!response.data.live && response.data.raised_amount === 0) {
						// means no funding data
						setFundingDataUpdated(true);
					}
				})
				.catch((response) => window.alert(response.message));
		}
	}, []);
	return (
		<div className="post">
			{!projectData.title || !projectId || projectId === undefined ? (
				<LoadingSpinner />
			) : (
				<div>
					<ProjectCard
						image={projectData.thumbnail}
						title={projectData.title}
						projectId={projectData.id}
						text={projectData.head}
						projectLive={projectData.live}
						number_of_donators={projectData.number_of_donators}
						numberOfSubscribers={projectData.number_of_subscribed_users}
						staking_address={projectData.staking_address}
						projectSuccessfullyEnded={projectSuccessfullyEnded}
						fundingDataUpdated={fundingDataUpdated}
						ownerId={projectData.owner}
						ownerUsername={projectData.owner_username}
						projectAddress={projectData.address}
						ownerProfilePicture={projectData.owner_profile_picture}
					/>
					{(projectData.live || projectData.raised_amount > 0) && (
						<ProjectCurrentContributions
							setProjectSuccessfullyEnded={setProjectSuccessfullyEnded}
							setFundingDataUpdated={setFundingDataUpdated}
							projectId={projectData.id}
						/>
					)}
					{(projectData.live ||
						projectSuccessfullyEnded === true ||
						projectSuccessfullyEnded === false) && (
						<ProjectDescription
							description={projectData.description}
							ownerId={projectData.owner}
							ownerUsername={projectData.owner_username}
							ownerProfilePicture={projectData.owner_profile_picture}
							projectId={projectData.id}
							incentivesData={incentivesData}
							projectLive={projectData.live}
						/>
					)}
				</div>
			)}
		</div>
	);
}
