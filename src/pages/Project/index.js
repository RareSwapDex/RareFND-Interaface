import "bootstrap/dist/css/bootstrap.css";
import ProjectCurrentContributions from "../../components/ProjectCurrentContributions";
import ProjectDescription from "../../components/ProjectDescription";
import axios from "axios";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";

export default function Project(props) {
	const [height, setHeight] = useState({});
	const [projectData, setProjectData] = useState({});
	const [incentivesData, setIncentivesData] = useState(null);

	const projectId = window.location.href.split("/").at(-1);

	useEffect(() => {
		axios
			.get(`https://rarefndapi.herokuapp.com/api/incentives/${projectId}/`)
			.then((response) => {
				if (response.status === 200)
					setIncentivesData(response.data.incentives);
			});
	}, []);

	useEffect(() => {
		setHeight(window.innerHeight);
		window.addEventListener("resize", () => setHeight(window.innerHeight));
		return () =>
			window.removeEventListener("resize", () => setHeight(window.innerHeight));
	}, []);
	useEffect(() => {
		axios
			.get(`https://rarefndapi.herokuapp.com/api/project/${projectId}/`)
			.then((response) => {
				setProjectData(response.data);
			});
	}, []);
	return (
		<div className="post">
			<ProjectCard
				image={projectData.thumbnail}
				title={projectData.title}
				text={projectData.head}
				backgroudColor="black"
				projectLive={projectData.live}
				image_height={height / 1.8}
				staking_address={projectData.staking_address}
			/>
			<ProjectCurrentContributions />
			<ProjectDescription
				description={projectData.description}
				projectId={projectData.id}
				incentivesData={incentivesData}
			/>
		</div>
	);
}
