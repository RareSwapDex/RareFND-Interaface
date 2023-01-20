import { Link } from "react-router-dom";
import "./index.css";

export default function CategoryVerticalCard(props) {
	const s = { ...props.imageStyle };
	return (
		<Link
			to={`/projects/${props.owner_username.replace(
				/\s+/g,
				"-"
			)}/${props.title.replace(/\s+/g, "-")}`}
			className="subnav_link"
		>
			<div className="w-100" style={{ position: "relative" }}>
				<div>
					<img
						id="vertical_card_image"
						className="d-block "
						style={
							props.imageStyle
								? { ...props.imageStyle, padding: " 1vw 6vw 2vw 0vw" }
								: { width: "100%", padding: "1vw 6vw 2vw 0vw" }
						}
						src={props.src}
					/>
				</div>
				<div style={{ width: "90%" }}>
					<h3>{props.title}</h3>
					<p style={{ width: "100%" }}>{props.description}</p>
					<div style={{ display: "inline-block", marginTop: "2rem" }}>
						<p
							style={{
								backgroundColor: props.project_live
									? "Red"
									: props.project_raised_amount >= props.project_goal_amount
									? "#5BB85C"
									: props.project_raised_amount === 0
									? "#cd77d3"
									: "Red",
								padding: "0.1rem 0.7rem 0.1rem 0.7rem",
								borderRadius: "8px",
								position: "absolute",
								bottom: "0",
								color: "white",
							}}
						>
							{props.project_live
								? "Live"
								: props.project_raised_amount >= props.project_goal_amount
								? "Successful"
								: props.project_raised_amount === 0
								? "Coming Soon"
								: "Failed"}
						</p>
					</div>
					{/* <p style={{ width: "100%" }}>By: {props.project_owner}</p> */}
				</div>
			</div>
		</Link>
	);
}
