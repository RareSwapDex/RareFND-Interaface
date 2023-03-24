import "bootstrap/dist/css/bootstrap.css";
// import Image from "react-bootstrap/Image";
// import rarefnd_logo from "../../assets/logos/rarefnd_logo.png";
import "./index.css";
// import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Web3ConnectButton from "../Web3ConnectButton/index";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
// import avatar from "../../assets/logos/user.png";
// import ReactSlick from "../../components/ReactSlick";
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
import dollarTop from "../../assets/home-images/dollar_top.png";
import MainLogo from "../../assets/home-images/main_logo.png";

function NavBar() {
	const navigate = useNavigate();
	const [categoriesData, setCategoriesData] = useState({});
	const { user, logOut } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/category/")
			.then((response) => setCategoriesData(response.data.categories));
	}, []);

	return (
		<div>
			<div>
				<div className="header_top">
					<Container>
						<Row className="align-items-center">
							<Col md={8}>
								<p className="header_top_text">
									{" "}
									<img src={dollarTop} alt="top" />
									<a
										href="https://rarefnd.zendesk.com/hc/en-gb/articles/7408695124125-Introducing-Give2Earn"
										target="_blank"
										rel="noreferrer"
										alt=""
									>
										Donate now and benefit from Give2Earn at Rare FND
									</a>
								</p>
							</Col>
							<Col md={4}>
								{user ? (
									<div className="d-flex justify-content-end">
										<button
											className="login"
											onMouseDown={logOut}
											onClick={() => navigate("/logout")}
										>
											Log Out
										</button>
										<button
											className="sign_up"
											onMouseDown={(e) => e.preventDefault()}
											onClick={() => navigate("/dashboard")}
										>
											Dashboard
										</button>
									</div>
								) : (
									<div className="d-flex justify-content-end">
										<button
											className="login"
											onClick={() => navigate("/login")}
										>
											Login
										</button>
										<button
											className="sign_up"
											onClick={() => navigate("/signup")}
										>
											Sign Up
										</button>
									</div>
								)}
							</Col>
						</Row>
					</Container>
				</div>

				<Navbar expand="lg">
					<Container className="align-items-start">
						<Navbar.Brand onClick={() => navigate("/home")}>
							<img src={MainLogo} alt="logo" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav" className="nav_bar">
							<Nav className="ms-auto">
								<Nav.Link onClick={() => navigate("/home")} className="active">
									Home
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Art")}>
									Art
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Design-&-Tech")}>
									Design & Tech
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Films")}>
									Films
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Food-&-Craft")}>
									Food & Crafts
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Education")}>
									Education
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Games")}>
									Games
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Music")}>
									Music
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Publishing")}>
									Publishing
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Non-Profit")}>
									Non Profit
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/category/Politics")}>
									Politics
								</Nav.Link>
								<Web3ConnectButton />
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>

			{/* <div className="ResponsiveNav">
				<ReactSlick categoriesData={categoriesData} />
			</div> */}
		</div>
	);
}

export default NavBar;
