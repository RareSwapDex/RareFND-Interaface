import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";

export default function CategoryHorizontalCard(props) {
	return (
		<Link
			to={`/projects/${props.owner_username.replace(
				/\s+/g,
				"-"
			)}/${props.title.replace(/\s+/g, "-")}`}
			className="subnav_link"
		>
			<div>
				<Row
					style={{
						width: "100%",
						height: "100%",
						padding: "1vw 0vw 0vw 0vw",
						position: "relative",
					}}
				>
					<Col xs={6} style={{ height: "100%" }}>
						<div>
							<img
								className="horizontal_card_image"
								src={props.src}
								style={{ objectFit: "cover" }}
							/>
						</div>
					</Col>
					<Col xs={6}>
						<div>
							<h5>{props.title}</h5>
							<div style={{ display: "inline-block" }}>
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
							{/* <p>By: {props.project_owner}</p> */}
						</div>
					</Col>
				</Row>
				<hr className="hor_underline" />
			</div>
		</Link>
	);
}
