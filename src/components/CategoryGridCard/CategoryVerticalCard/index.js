import { Link } from "react-router-dom";
import "./index.css";
import { Progress } from "antd";

export default function CategoryVerticalCard(props) {
	function truncateText(text, maxLength = 220) {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	}
	const project = props.project;
	const currentPercentage =
		((Number(project.raised_amount) + Number(project.current_reward)) /
			Number(project.fund_amount)) *
		100;

	const s = { ...props.imageStyle };
	return (
		<Link
			to={`/projects/${props.owner_username.replace(
				/\s+/g,
				"-"
			)}/${props.title.replace(/\s+/g, "-")}`}
			className="subnav_link"
		>
			<div
				className="category-vertical-card w-100"
				style={{ position: "relative" }}
			>
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
				<div>
					<img
						className="vertical-card-image d-block"
						style={
							props.imageStyle ? { ...props.imageStyle } : { width: "100%" }
						}
						src={props.src}
					/>
				</div>
				<div className="my-3">
					<h3
						className="p-0 m-0"
						style={{
							display: "inline-flex",
							alignItems: "center",
							color: "black",
						}}
					>
						{props.title}
					</h3>
					<p style={{ width: "100%", color: "grey" }}>
						{truncateText(props.description)}
					</p>
				</div>
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
		</Link>
	);
}
