import Category from "./pages/Category";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Project from "./pages/Project";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignupPage";
import StartProject from "./pages/StartProject";
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Main() {
	const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({block: 'center'});
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

	return (
		<div className="main" style={{ minHeight: "100vh" }}>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/home" element={<Home />} />
				<Route path="/category/:categoryname" element={<Category />} />
				<Route exact path="/project/:id" element={<Project />} />
				<Route exact path="/about" element={<About />} />
				<Route exact path="/programs" element={<Programs />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route
					exact
					path="/start-project"
					element={<PrivateRoute Component={StartProject} />}
				/>
			</Routes>
		</div>
	);
}
