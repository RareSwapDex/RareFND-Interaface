import { Link } from "react-router-dom";
import "./index.css";

export default function CategoryVerticalCard(props) {
	function truncateText(text, maxLength = 220) {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	}

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
							: "Red",
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
						: "Failed"}
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
					<div style={{ display: "inline-block", marginTop: "2rem" }}></div>
				</div>
			</div>
		</Link>
	);
}
