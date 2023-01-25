import "./Profile.css";
import Profile from "../Profile/Profile";

import { Button, Row } from "react-bootstrap";

export default function Profile_(props) {
	return (
		<div className="dashboard-profile">
			<div className="dashboard-profile-container">
				<div className="container rounded bg-white mt-5 mb-5">
					<Profile />
					<Row
						style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}
					>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ textAlign: "left" }}>
								<Button
									onMouseDown={(e) => e.preventDefault()}
									size="md"
									onClick={props.previousTabFunction}
									style={{
										background:
											"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
										border: "none",
										color: "white",
										borderRadius: "0px",
										width: "8vw",
										minWidth: "100px",
									}}
								>
									Previous
								</Button>
							</div>

							<div style={{ textAlign: "right" }}>
								<Button
									onMouseDown={(e) => e.preventDefault()}
									size="md"
									onClick={props.nextTabFunction}
									style={{
										background:
											"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
										border: "none",
										color: "white",
										borderRadius: "0px",
										width: "8vw",
										minWidth: "100px",
									}}
								>
									Next
								</Button>
							</div>
						</div>
					</Row>
				</div>
			</div>
		</div>
	);
}
