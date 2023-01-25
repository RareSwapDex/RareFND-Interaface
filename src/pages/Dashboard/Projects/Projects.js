import SideBar from "../../../components/DashboardSideBare";
import DashboardProjectCard from "../../../components/DashboardProjectCard";
import "./project.scss";
import { List } from "antd";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";

export default function DashboardProject() {
	let { user } = useContext(AuthContext);
	const [projectsData, setProjectsData] = useState([]);
	useEffect(() => {
		axios
			.get(
				// process.env.REACT_APP_BASE_URL + `/api/projects/user/${user.username}/`
				process.env.REACT_APP_BASE_URL + `/api/projects/user/dean/`
			)
			.then((response) => {
				if (response.status === 200) {
					setProjectsData(response.data.projects);
				}
			});
	}, []);

	return (
		<div className="dashboard-projects">
			<SideBar />
			<div
				className="dashboard-projects-container"
				style={{ maxWidth: "100%" }}
			>
				<List
					grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
					dataSource={projectsData}
					renderItem={(project) => (
						<List.Item>
							<DashboardProjectCard project={project} />
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
}
