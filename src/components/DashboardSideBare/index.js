import "./sideBar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function SideBar() {
	return (
		<div className="dashboard-sidebar">
			<div className="center">
				<ul>
					<Link to="/dashboard/profile" style={{ textDecoration: "none" }}>
						<li>
							<AccountBoxIcon className="dashboard-icon" />
							<span>Profile</span>
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
							<span>Add New Project</span>
						</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}
