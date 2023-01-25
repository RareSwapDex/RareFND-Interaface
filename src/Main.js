import Category from "./pages/Category";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Login from "./pages/Login";
import Partners from "./pages/Partners";
import TermsOfService from "./pages/TermsOfService";
import Legal from "./pages/LegalDisclaimer";
import Signup from "./pages/SignupPage";
import PublicProfile from "./pages/PublicProfile";
import ResetPassword from "./pages/ResetPassword";
import Project from "./pages/Project";
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./Context/AuthContext";
import DashboardHome from "./pages/Dashboard/Home/Home.js";
import Stats from "./pages/Dashboard/Stats/Stats.js";
import Profile from "./pages/Dashboard/Profile/Profile.js";
import DashboardNewProject from "./pages/Dashboard/NewProject/Project.js";
import DashboardProjects from "./pages/Dashboard/Projects/Projects.js";
import CommingSoon from "./components/CommingSoon/CommingSoon";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function Main() {
	const { pathname, hash, key } = useLocation();
	let { user } = useContext(AuthContext);
	useEffect(() => {
		// if not a hash link, scroll to top
		if (hash === "") {
			window.scrollTo(0, 0);
		}
		// else scroll to id
		else {
			setTimeout(() => {
				const id = hash.replace("#", "");
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({ block: "center" });
				}
			}, 0);
		}
	}, [pathname, hash, key]); // do this on route change

	return (
		<div className="main" style={{ minHeight: "70vh" }}>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/category/:categoryname" element={<Category />} />
				<Route exact path="/project/:id" element={<Project />} />
				<Route exact path="/projects/:owner/:title" element={<Project />} />
				{/* <Route exact path="/contact-us" element={<About />} /> */}
				<Route exact path="/legal" element={<Legal />} />
				<Route exact path="/about-us" element={<Programs />} />
				<Route exact path="/partners" element={<Partners />} />
				<Route exact path="/login" element={!user ? <Login /> : <Home />} />
				<Route exact path="/coming-soon" element={<CommingSoon />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route exact path="/terms-of-service" element={<TermsOfService />} />
				<Route exact path="/profile/:id" element={<PublicProfile />} />
				<Route
					exact
					path="/user/reset_password/:email/:token"
					element={<ResetPassword />}
				/>
				<Route
					exact
					path="/dashboard"
					element={<PrivateRoute Component={Profile} />}
				/>
				<Route
					exact
					path="/dashboard/new-project"
					element={<PrivateRoute Component={DashboardNewProject} />}
				/>
				<Route
					exact
					path="/dashboard/profile"
					element={<PrivateRoute Component={Profile} />}
				/>
				<Route
					exact
					path="/dashboard/stats"
					element={<PrivateRoute Component={Stats} />}
				/>
				<Route
					exact
					path="/dashboard/projects"
					element={<PrivateRoute Component={DashboardProjects} />}
				/>
			</Routes>
		</div>
	);
}
