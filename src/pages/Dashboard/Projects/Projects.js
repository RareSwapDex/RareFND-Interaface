import SideBar from "../../../components/DashboardSideBare";
import "./project.scss";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Row, Col } from "react-bootstrap";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

export default function DashboardProject() {
	let { user } = useContext(AuthContext);
	const [projectsData, setProjectsData] = useState(null);
	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BASE_URL + `/api/projects/user/${user.username}/`
			)
			.then((response) => {
				console.log("pplplplpopopop", response.data.projects);
				if (response.status === 200) {
					setProjectsData(response.data.projects);
				}
				console.log(response.data.projects);
			});
	}, []);

	return (
		<div className="dashboard-projects w-100">
			<SideBar />
			<div className="px-4 pt-2 dashboard-projects-container">
				{projectsData ? (
					projectsData.length === 0 ? (
						<div className="center-div">
							<h2>No projects to show</h2>
						</div>
					) : (
						projectsData.map((project) => (
							<Link
								to={`/dashboard/edit-project/${project.title}`}
								style={{
									textDecoration: "none",
								}}
							>
								<Row
									className="border border-secondary p-2 dashboard-project-row mb-4"
									style={{ minHeight: "300px" }}
									role="button"
								>
									<Col md={4} className="ps-0">
										<img
											src={project.thumbnail}
											style={{
												height: "300px",
												width: "100%",
												objectFit: "cover",
												border: "1px solid lightgrey",
											}}
											className="p-1"
										/>
									</Col>
									<Col
										md={8}
										style={{ display: "flex", flexDirection: "column" }}
									>
										<h1
											style={{
												color: "black",
											}}
										>
											{project.title}
										</h1>
										<p style={{ color: "darkGray" }}>{project.head}</p>
										<p
											className="p-0 m-0"
											style={{
												color: "black",
											}}
										>
											Funding goal:{" "}
											<span style={{ color: "#cd77d3" }}>
												${project.fund_amount.toLocaleString()}
											</span>
										</p>
										<p
											className="p-0 m-0"
											style={{
												color: "black",
											}}
										>
											Raised Amount:
											<span style={{ color: "#cd77d3" }}>
												{" "}
												$
												{(
													Number(project.raised_amount) + project.current_reward
												).toLocaleString(undefined, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})}{" "}
												-{" "}
												{`${(
													((Number(project.raised_amount) +
														project.current_reward) /
														Number(project.fund_amount)) *
													100
												).toFixed(2)}%`}
											</span>
										</p>
										<p className="p-0 m-0">
											<span
												style={{
													color: "black",
												}}
											>
												Number of subscribers:
											</span>
											<span style={{ color: "#cd77d3" }}>
												{" "}
												{project.number_of_subscribed_users}
											</span>
										</p>
										<div style={{ flex: "1" }}></div>
										<div style={{ display: "flex" }}>
											<Tooltip
												placement="top"
												title={
													!project.approved
														? "Your project is under review. We'll notify you once it's approved."
														: project.live
														? "Your project is live. Contributors can now donate to your project."
														: project.raised_amount >= project.goal_amount
														? "Your project has reached its target amount. Congratulations on the successful campaign!"
														: project.raised_amount === 0
														? "Your project has been approved and will soon be live. Subscriptions are open, but donations will start only after the project goes live."
														: "This project has ended without reaching its target amount. It's no longer live, but don't lose hope, every step is a learning opportunity."
												}
											>
												<p
													className="px-2 m-0 me-2"
													style={{
														backgroundColor: !project.approved
															? "lightgrey"
															: project.live
															? "Red"
															: project.raised_amount >= project.goal_amount
															? "#5BB85C"
															: project.raised_amount === 0
															? "#cd77d3"
															: "lightgrey",
														borderRadius: "8px",
														margin: 0,
														width: "max-content",
														fontSize: "0.8rem",
														color: "white",
														verticalAlign: "middle",
														filter:
															"drop-shadow(rgba(0, 0, 0, 0.25) -3px 2px 3px)",
														flex: "end",
													}}
												>
													{!project.approved
														? "Waiting approval"
														: project.live
														? "Live"
														: project.raised_amount >= project.goal_amount
														? "Successful"
														: project.raised_amount === 0
														? "Approved (Soon will be live)"
														: "Finished"}
												</p>
											</Tooltip>
											{project.featured && (
												<Tooltip
													placement="top"
													title={
														"Your project is a 'Featured' project. It has higher visibility on its category page."
													}
												>
													<p
														className="px-2 m-0 me-2"
														style={{
															backgroundColor: "#5BB85C",
															borderRadius: "8px",
															margin: 0,
															width: "max-content",
															fontSize: "0.8rem",
															color: "white",
															verticalAlign: "middle",
															filter:
																"drop-shadow(rgba(0, 0, 0, 0.25) -3px 2px 3px)",
															flex: "end",
														}}
													>
														Featured
													</p>
												</Tooltip>
											)}

											{project.recommended && (
												<Tooltip
													placement="top"
													title={
														"Your project is a 'Recommended' project. It stands out in its category for its potential or progress."
													}
												>
													<p
														className="px-2 m-0 me-2"
														style={{
															backgroundColor: "#5BB85C",
															borderRadius: "8px",
															margin: 0,
															width: "max-content",
															fontSize: "0.8rem",
															color: "white",
															verticalAlign: "middle",
															filter:
																"drop-shadow(rgba(0, 0, 0, 0.25) -3px 2px 3px)",
															flex: "end",
														}}
													>
														Recommended
													</p>
												</Tooltip>
											)}
										</div>
									</Col>
								</Row>
							</Link>
						))
					)
				) : (
					<LoadingSpinner color="#cd77d3" />
				)}
			</div>
		</div>
	);
}
