import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";
import { Progress } from "antd";

export default function CategoryHorizontalCard(props) {
	function truncateText(text, maxLength = 80) {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	}
	const project = props.project;
	const currentPercentage =
		((Number(project.raised_amount) + Number(project.current_reward)) /
			Number(project.fund_amount)) *
		100;

	return (
		<div>
			<Row
				style={{
					width: "100%",
					height: "100%",
					padding: "1vw 0vw 0vw 0vw",
					position: "relative",
				}}
			>
				<Col xs={5} style={{ height: "100%" }}>
					<Link
						to={`/projects/${props.owner_username.replace(
							/\s+/g,
							"-"
						)}/${props.title.replace(/\s+/g, "-")}`}
						className="subnav_link"
					>
						<div style={{ position: "relative" }}>
							<img
								className="horizontal_card_image w-100"
								src={props.src}
								style={{
									objectFit: "cover",
									filter: "drop-shadow(rgba(0, 0, 0, 0.25) -6px 7px 8px)",
									borderRadius: "8px",
									height: "100%",
								}}
							/>
							<p
								className="px-2 m-0 me-2"
								style={{
									backgroundColor: props.project_live
										? "Red"
										: props.project_raised_amount >= props.project_goal_amount
										? "#5BB85C"
										: props.project_raised_amount === 0
										? "#cd77d3"
										: "lightgrey",
									borderRadius: "8px",
									position: "absolute",
									top: "5px",
									left: "5px",
									margin: 0,
									zIndex: "1000",
									fontSize: "0.8rem",
									color: "white",
									verticalAlign: "middle",
									filter: "drop-shadow(rgba(0, 0, 0, 0.25) -6px 7px 8px)",
								}}
							>
								{props.project_live
									? "Live"
									: props.project_raised_amount >= props.project_goal_amount
									? "Successful"
									: props.project_raised_amount === 0
									? "Soon"
									: "Finished"}
							</p>
						</div>
					</Link>
				</Col>

				<Col xs={7} className="ps-0">
					<div>
						<Link
							to={`/projects/${props.owner_username.replace(
								/\s+/g,
								"-"
							)}/${props.title.replace(/\s+/g, "-")}`}
							className="subnav_link"
						>
							<p
								className="p-0 m-0"
								style={{
									display: "inline-flex",
									alignItems: "center",
									color: "black",
									fontSize: "1rem",
								}}
							>
								{props.title}
							</p>
							<p
								className="horizontal-card-description m-0 p-0"
								style={{ color: "grey", fontSize: "0.9rem" }}
							>
								{truncateText(props.description)}
							</p>
						</Link>
						<Link to={`/profile/${project.owner_username}`}>
							<p
								className="horizontal-card-by m-0 p-0"
								style={{ fontSize: "0.8rem" }}
							>
								By {truncateText(project.owner_username)}
							</p>
						</Link>
						{(project.live || project.raised_amount >= project.fund_amount) && (
							<Progress
								percent={Math.round(
									((Number(project.raised_amount) +
										Number(project.current_reward)) /
										Number(project.fund_amount)) *
										100
								)}
								size="small"
								status="active"
								strokeColor={currentPercentage >= 100 ? "#5BB85C" : "#CD77D3"}
								showInfo={false}
							/>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
}
