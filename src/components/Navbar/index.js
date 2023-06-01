import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Web3ConnectButton from "../Web3ConnectButton/index";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import LanguageContext from "../../Context/LanguageContext";
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
import dollarTop from "../../assets/home-images/dollar_top.png";
import MainLogo from "../../assets/home-images/main_logo.png";
import { Sling as Hamburger } from "hamburger-react";
import { Menu } from "antd";
import Slider from "react-slick";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function NavBar() {
	const navigate = useNavigate();
	const [categoriesData, setCategoriesData] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { user, logOut } = useContext(AuthContext);
	const { language, setLanguage } = useContext(LanguageContext);
	const { t } = useTranslation();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const menuItems = categoriesData
		? categoriesData.map((category) => (
				<Menu.Item key={category.id}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<img
							src={category.image}
							alt={category.name}
							style={{ width: "100px", objectFit: "cover" }}
							loading="lazy"
						/>
						<span>{category.name}</span>
					</div>
				</Menu.Item>
		  ))
		: null;

	const menu = (
		<Menu mode="horizontal" theme="dark" style={{ textAlign: "center" }}>
			{menuItems}
		</Menu>
	);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/category/")
			.then((response) => {
				console.log(response);
				return setCategoriesData(response.data.categories);
			});
	}, []);

	const CustomArrowLeft = ({ className, style, onClick }) => (
		<FiArrowLeft
			className={className}
			style={{
				...style,
				fontSize: "30px",
				color: "black",
				position: "absolute",
				top: "50%",
				left: "5",
				zIndex: "1",
				transform: "translate(-50%, -50%)",
			}}
			onClick={onClick}
		/>
	);

	const CustomArrowRight = ({ className, style, onClick }) => (
		<FiArrowRight
			className={className}
			style={{
				...style,
				fontSize: "30px",
				color: "black",
				position: "absolute",
				top: "50%",
				right: language === "arabic" ? "" : "5",
				left: language === "arabic" ? "98%" : "",
				zIndex: "1",
				transform: "translate(50%, -50%)",
			}}
			onClick={onClick}
		/>
	);
	const sliderSettings = {
		nextArrow: <CustomArrowRight />,
		prevArrow: <CustomArrowLeft />,
		dots: false,
		speed: 500,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 860,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div>
			<div>
				<div className="header_top">
					<Container>
						<Row className="align-items-center">
							<Col md={8}>
								<p className="header_top_text">
									{" "}
									<img className="mx-2" src={dollarTop} alt="top" />
									<a
										href="https://rarefnd.zendesk.com/hc/en-gb/articles/7408695124125-Introducing-Give2Earn"
										target="_blank"
										rel="noreferrer"
										alt=""
									>
										{t("navBar.topBanner.text")}
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
											{t("navBar.topBanner.buttons.logOut")}
										</button>
										<button
											className="sign_up"
											onMouseDown={(e) => e.preventDefault()}
											onClick={() => navigate("/dashboard")}
										>
											{t("navBar.topBanner.buttons.dashboard")}
										</button>
										<button
											className="sign_up"
											onClick={() =>
												language === "arabic"
													? setLanguage("english")
													: setLanguage("arabic")
											}
										>
											{language === "arabic" ? "English" : "عربي"}
										</button>
									</div>
								) : (
									<div className="d-flex justify-content-end">
										<button
											className="login"
											onClick={() => navigate("/login")}
										>
											{t("navBar.topBanner.buttons.login")}
										</button>
										<button
											className="sign_up"
											onClick={() => navigate("/signup")}
										>
											{t("navBar.topBanner.buttons.signUp")}
										</button>
										<button
											className="sign_up"
											onClick={() =>
												language === "arabic"
													? setLanguage("english")
													: setLanguage("arabic")
											}
										>
											{language === "arabic" ? "English" : "عربي"}
										</button>
									</div>
								)}
							</Col>
						</Row>
					</Container>
				</div>
				<div className="slick-nav-bar">
					<Container>
						<div
							className="py-3"
							style={{ display: "flex", justifyContent: "space-between" }}
						>
							<Link to="/">
								<img src={MainLogo} alt="logo" style={{ width: "60px" }} />
							</Link>
							<div style={{ display: "flex", alignItems: "center" }}>
								<div style={{ display: "flex" }}>
									{isOpen && <Web3ConnectButton />}
									<Hamburger toggled={isOpen} toggle={toggleMenu} />
								</div>
							</div>
						</div>
					</Container>
					{categoriesData && isOpen && (
						<div className="w-100 px-2 header-slick py-4">
							<Slider {...sliderSettings} className="custom-slider">
								{categoriesData.map(
									(category) =>
										category.name != "Test" && (
											<div key={category.id} className="slick-item center-div">
												<Link
													to={`/category/${category.name.replace(/ /g, "-")}`}
												>
													<div
														style={{
															display: "flex",
															flexDirection: "column",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<img
															src={category.image}
															alt={category.name}
															style={{
																width: "220px",
																height: "140px",
																objectFit: "cover",
																borderRadius: "12px",
																filter:
																	"drop-shadow(-6px 7px 8px rgba(0, 0, 0, 0.25))",
															}}
															loading="lazy"
														/>
														<span className="py-2">
															{language === "arabic"
																? category.arabic_name
																: category.name}
														</span>
													</div>
												</Link>
											</div>
										)
								)}
							</Slider>
						</div>
					)}
				</div>

				<Navbar expand="lg" className="bootstrap-nav-bar">
					<Container className="align-items-start">
						<Navbar.Brand onClick={() => navigate("/home")}>
							<img src={MainLogo} alt="logo" />
						</Navbar.Brand>
						<Navbar.Toggle
							aria-controls="basic-navbar-nav"
							style={{ border: "none", height: "50px" }}
						>
							<div className="center-div">
								<Hamburger
									style={{
										frontSize: "2rem",
										height: "2rem",
										width: "2rem",
									}}
								/>
							</div>
						</Navbar.Toggle>
						<Navbar.Collapse id="basic-navbar-nav" className="nav_bar">
							<Nav className="ms-auto">
								{categoriesData &&
									categoriesData.map(
										(category) =>
											category.name != "Test" && (
												<Nav.Link
													key={category.id}
													onClick={() =>
														navigate(
															`/category/${category.name.replace(/ /g, "-")}`
														)
													}
													className="active"
												>
													{language === "arabic"
														? category.arabic_name
														: category.name}
												</Nav.Link>
											)
									)}
								<Web3ConnectButton />
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		</div>
	);
}

export default NavBar;
