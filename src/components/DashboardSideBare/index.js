import "./sideBar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import {
	BsFillArrowRightSquareFill,
	BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { useState } from "react";

export default function SideBar() {
	const [displaySideBarTitles, setDisplaySideBarTitles] = useState(true);
	function expandSideBar() {
		setDisplaySideBarTitles(!displaySideBarTitles);
	}

	return (
		<div className="dashboard-sidebar" style={{ position: "relative" }}>
			<div className="center mt-3">
				<ul>
					<Link
						to="/dashboard/profile"
						style={{
							textDecoration: "none",
						}}
					>
						<li>
							<AccountBoxIcon className="dashboard-icon" />
							<span
								style={{ display: displaySideBarTitles ? "block" : "none" }}
							>
								Profile
							</span>
						</li>
					</Link>
					{/* <Link to="/dashboard/projects" style={{ textDecoration: "none" }}>
						<li>
							<AssignmentIcon className="dashboard-icon" />
							<span>Your Projects</span>
						</li>
					</Link> */}
					<Link to="/dashboard/new-project" style={{ textDecoration: "none" }}>
						<li>
							<AddIcon className="dashboard-icon" />
							<span
								style={{ display: displaySideBarTitles ? "block" : "none" }}
							>
								Add New Project
							</span>
						</li>
					</Link>
				</ul>
			</div>
			{displaySideBarTitles ? (
				<BsFillArrowLeftSquareFill
					className="expand-side-bar-icon"
					style={{
						fontSize: "1.5rem",
						color: "#CD77D3",
						position: "absolute",
						right: "0",
						top: "0",
						cursor: "pointer",
					}}
					onClick={expandSideBar}
				/>
			) : (
				<BsFillArrowRightSquareFill
					className="expand-side-bar-icon"
					style={{
						fontSize: "1.5rem",
						color: "#CD77D3",
						position: "absolute",
						right: "-24px",
						top: "0",
						cursor: "pointer",
					}}
					onClick={expandSideBar}
				/>
			)}
		</div>
	);
}
