import "./sideBar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import {
	BsFillArrowRightSquareFill,
	BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { useContext, useEffect } from "react";
import { FiPlusSquare } from "react-icons/fi";
import DashboardSideBarContext from "../../Context/DashboardSideBarContext";
import { useLocation } from "react-router-dom";

export default function SideBar() {
	let {
		ShowDashboardSideBar,
		setShowDashboardSideBar,
		selectedTabIndex,
		setSelectedTabIndex,
	} = useContext(DashboardSideBarContext);

	const { pathname } = useLocation();

	function expandSideBar() {
		setShowDashboardSideBar(!ShowDashboardSideBar);
	}

	useEffect(() => {
		console.log("lplpl", pathname);
		if (pathname.includes("/profile") || pathname === "/dashboard")
			setSelectedTabIndex(0);
	}, []);

	return (
		<div
			className="dashboard-sidebar"
			style={{
				position: "relative",
				minWidth: ShowDashboardSideBar ? "200px" : "auto",
				zIndex: "3",
			}}
		>
			<div className="center mt-3">
				<ul>
					<Link
						to="/dashboard/profile"
						style={{
							textDecoration: "none",
						}}
					>
						<li
							style={{ backgroundColor: selectedTabIndex === 0 && "#ebcbdc" }}
							onClick={() => setSelectedTabIndex(0)}
						>
							<AccountBoxIcon className="dashboard-icon" />
							<span
								style={{ display: ShowDashboardSideBar ? "block" : "none" }}
							>
								Profile
							</span>
						</li>
					</Link>
					<Link
						to="/dashboard/projects"
						style={{ textDecoration: "none" }}
						onClick={() => setSelectedTabIndex(1)}
					>
						<li
							style={{ backgroundColor: selectedTabIndex === 1 && "#ebcbdc" }}
						>
							<RxDashboard className="dashboard-icon" />
							<span
								style={{ display: ShowDashboardSideBar ? "block" : "none" }}
							>
								Your Projects
							</span>
						</li>
					</Link>
					<Link
						to="/dashboard/new-project"
						style={{ textDecoration: "none" }}
						onClick={() => setSelectedTabIndex(2)}
					>
						<li
							style={{ backgroundColor: selectedTabIndex === 2 && "#ebcbdc" }}
						>
							<FiPlusSquare className="dashboard-icon" />
							<span
								style={{ display: ShowDashboardSideBar ? "block" : "none" }}
							>
								Add New Project
							</span>
						</li>
					</Link>
				</ul>
			</div>
			{ShowDashboardSideBar ? (
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
