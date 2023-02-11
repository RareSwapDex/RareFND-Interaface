import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Web3ContributeButton from "../Web3ContributeButton";
import "./index.css";
import useAxios from "../../utils/useAxios/useAxios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import comingSoon from "../../assets/coming-soon.png";
import succeed from "../../assets/succeed.png";
import LoadingSpinner from "../../components/LoadingSpinner";
import { StarOutlined, FacebookFilled } from "@ant-design/icons";
import { Image, Avatar } from "antd";
import locationIcon from "../../assets/locationIcon.png";
import {
	FacebookShareCount,
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";

import {
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

export default function ProjectCard(props) {
	let api = useAxios();
	let { user } = useContext(AuthContext);
	const [subscribed, setSubscribed] = useState(false);
	const [subscribeButtonText, setSubscribeButtonText] = useState("");
	const [numberOfSubscribers, setNumberOfSubscribers] = useState(
		props.numberOfSubscribers
	);

	const navigate = useNavigate();
	const location = useLocation();
	const shareUrl = window.location.href;
	// const shareUrl =
	// ("https://rarefnd.com/projects/OkoaHeros/Clean-Water-for-Bulamagi-Village");

	useEffect(() => {
		if (subscribed) {
			setSubscribeButtonText("Subscribed");
		} else {
			setSubscribeButtonText("Remind me when live");
		}
	}, [subscribed]);

	useEffect(() => {
		if (
			props.projectId &&
			user &&
			!props.projectLive &&
			props.number_of_donators === 0
		) {
			if (document.getElementById("subscribe-btn")) {
				document.getElementById("subscribe-btn").disabled = true;
			}

			api
				.get(`/api/project/checked_subscribed/${props.projectId}/`)
				.then((response) => {
					if (response.status === 200) {
						setSubscribed(response.data.subscribed);
						if (!response.data.subscribed) {
							document.getElementById("subscribe-btn").disabled = false;
							const storedData = JSON.parse(
								localStorage.getItem("subscribeToProject")
							);
							if (storedData && storedData["subscribeToProject"]) {
								document.getElementById("subscribe-btn").disabled = true;
								subscribeToProject();
							}
						} else {
							localStorage.removeItem("subscribeToProject");
						}
					} else {
						window.alert("Session logged out, please log in and try again");
					}
				});
		}
	}, [props.projectId]);

	const subscribeToProject = () => {
		localStorage.setItem(
			"subscribeToProject",
			JSON.stringify({ subscribeToProject: props.projectId })
		);
		if (user) {
			document.getElementById("subscribe-btn").disabled = true;
			api
				.put(`/api/project/subscribe/`, { projectId: props.projectId })
				.then((response) => {
					if (response.status === 200) {
						setSubscribed(true);
						document.getElementById("subscribe-btn").textContent = "Subscribed";
						setNumberOfSubscribers(numberOfSubscribers + 1);
						localStorage.removeItem("subscribeToProject");
					} else {
						window.alert("Couldn't subscribe, please try again in few seconds");
						document.getElementById("subscribe-btn").disabled = false;
					}
				});
		} else {
			localStorage.setItem(
				"lastNonLoggedInVisitedUrl",
				JSON.stringify({ lastNonLoggedInVisitedUrl: location.pathname })
			);
			navigate("/login");
		}
	};

	return (
		<div>
			<Card className="border-0" style={{ backgroundColor: "transparent" }}>
				<Row
					// className={`w-100${
					// 	window.innerWidth > 1000 ? " vertical-divider" : ""
					// }`}
					className={`w-100`}
					style={{ margin: "0px" }}
				>
					<Col md={6} width="50%">
						<div
							style={{
								width: "100%",
								height: "100%",
							}}
							className="centerDiv"
						>
							<Image
								src={props.image}
								width="100%"
								style={{
									width: "100%",
									objectFit: "cover",
								}}
							/>
							{!props.projectLive &&
								props.projectSuccessfullyEnded !== false &&
								props.projectSuccessfullyEnded !== true && (
									<div
										style={{
											width: "100%",
											height: "30px",
											color: "white",
											display: "none",
										}}
										className="coming-soon-banner centerDiv"
									>
										<p style={{ margin: 0 }}>Coming Soon</p>
									</div>
								)}
						</div>
					</Col>
					{window.innerWidth <= 767 && (
						<div style={{ width: "100%" }}>
							<hr
								style={{
									border: "3px solid",
									color: "#cd77d3",
									opacity: "1",
									width: "100%",
									marginLeft: "-1%",
								}}
							/>
						</div>
					)}
					<Col md={6}>
						<Card.Body
							className="text-black text-center d-flex flex-column h-100"
							style={{
								paddingRight: "0",
								paddingLeft: "0",
								paddingBottom: "10px",
								paddingTop: window.innerWidth <= 767 ? "0" : "10px",
							}}
						>
							<div
								// className="centerDiv"
								style={{
									display: "flex",
									alignItems: "left",
									justifyContent: "space-between",
									backgroundColor: "white",
									margin: window.innerWidth > 1000 ? "0 200 0 200" : "0",
									padding: "2% 5% 2% 5%",
								}}
							>
								<div>
									<button
										className="primaryButton"
										style={{ marginRight: "20px" }}
										onClick={() => {
											const element =
												document.getElementById("project-rewards");
											if (element) {
												element.scrollIntoView({ block: "start" });
											}
										}}
									>
										Rewards
									</button>
									<button
										className="primaryButton"
										onClick={() => {
											const element = document.getElementById(
												"project-description"
											);
											if (element) {
												element.scrollIntoView({ block: "start" });
											}
										}}
									>
										Description
									</button>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									backgroundColor: "white",
									height: "100%",
									margin: window.innerWidth > 1000 ? "0 200 0 200" : "0",
									padding: "0 5% 0 5%",
									position: "relative",
								}}
							>
								{props.fundingDataUpdated ? (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											backgroundColor: "white",
											height: "100%",
										}}
									>
										{!props.projectLive &&
											(props.projectSuccessfullyEnded === true ? (
												<div
													style={{
														position: "absolute",
														top: "-5px",
														right: "-15px",
													}}
												>
													<img src={succeed} style={{ width: "5rem" }} />
												</div>
											) : props.projectSuccessfullyEnded === false ? (
												<></>
											) : (
												<div
													style={{
														position: "absolute",
														top: "-5px",
														right: "-5px",
													}}
												>
													<img
														id="comingSoonImage"
														src={comingSoon}
														style={{ width: "7rem" }}
													/>
												</div>
											))}
										<h1 style={{ margin: "0", padding: "0" }}>
											<Card.Title
												style={{
													fontSize: "xx-large",
													textAlign: "left",
												}}
											>
												{props.title}
											</Card.Title>
										</h1>

										<div
										// style={{
										// 	display:
										// 		props.projectSuccessfullyEnded !== false &&
										// 		props.projectSuccessfullyEnded !== true
										// 			? "block"
										// 			: "None",
										// }}
										>
											<div style={{ display: "flex" }}>
												<div style={{ width: "64px" }}>
													<Avatar
														style={{ width: 64, height: 64 }}
														src={
															<Image
																src={props.ownerProfilePicture}
																style={{ width: 64, height: 64 }}
															/>
														}
													/>
												</div>
												<Link
													to={`/profile/${props.ownerId}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													<div
														style={{
															display: "flex",
															flexDirection: "column",
															justifyContent: "space-between",
															padding: "12px 0 12px 12px",
														}}
													>
														<div
															style={{
																display: "flex",
																alignItems: "center",
															}}
														>
															<p
																style={{
																	margin: "0",
																	padding: "0",
																	color: "grey",
																}}
															>
																Project owner
															</p>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
															}}
														>
															<p style={{ margin: "0", padding: "0" }}>
																{props.ownerUsername !== "dean"
																	? props.ownerUsername
																	: "AURA SKYPOOL"}
															</p>
														</div>
													</div>
												</Link>
											</div>
										</div>
										<br></br>
										<div className="centerDiv" style={{ height: "100%" }}>
											<Card.Text
												style={{
													fontSize: "1.1rem",
													color: "grey",
													textAlign: "left",
													whiteSpace: "pre-wrap",
												}}
											>
												{props.text}
											</Card.Text>
										</div>
										<br />
										<div style={{ marginTop: "auto" }}>
											{props.projectLive ||
											props.projectSuccessfullyEnded === true ||
											props.projectSuccessfullyEnded === false ? (
												<div>
													<Web3ContributeButton
														projectId={props.projectId}
														staking_address={props.staking_address}
														staking_abi={props.staking_abi}
														projectLive={props.projectLive}
														projectSuccessfullyEnded={
															props.projectSuccessfullyEnded
														}
														projectCategory={props.projectCategory}
														projectName={props.title}
														selectedIncentive={() => props.selectedIncentive()}
														incentivesData={props.incentivesData}
														setSelectedIncentive={(id) =>
															props.setSelectedIncentive(id)
														}
													/>
													{props.number_of_donators && (
														<a
															href={`https://bscscan.com/address/${props.staking_address}`}
															target="_blank"
															rel="noreferrer"
															style={{
																textDecoration: "underline",
																color: "black",
															}}
														>
															<p>
																Total of {props.number_of_donators} contributors
															</p>
														</a>
													)}
												</div>
											) : (
												props.projectSuccessfullyEnded === null && (
													<div>
														<Button
															type="primary"
															icon={<StarOutlined />}
															id="subscribe-btn"
															onClick={subscribeToProject}
															disabled={subscribed}
															size="large"
														>
															{subscribeButtonText}
														</Button>
														<p style={{ marginTop: "10px" }}>
															{`${numberOfSubscribers} Subscribers`}
														</p>
													</div>
												)
											)}
										</div>
										<hr style={{ marginBottom: "10px 0 10px 0" }} />

										{/* <EmailShareButton url={window.location.href} /> */}

										<Row>
											<Col md={6} style={{ marginBottom: "10px" }}>
												<div
													className="project-address"
													style={{ display: "flex", alignItems: "center" }}
												>
													<img src={locationIcon}></img>
													<p style={{ margin: "0", padding: "0 0 0 5px" }}>
														{props.projectAddress}
													</p>
												</div>
											</Col>
											<Col md={6} style={{ marginBottom: "30px" }}>
												<div
													style={{
														display: "flex",
														justifyContent: "space-around",
														alignContent: "center",
													}}
												>
													<div className="centerDiv">
														<p style={{ margin: "0", padding: "0" }}>Share: </p>
													</div>
													<FacebookShareButton url={shareUrl}>
														<FacebookIcon size={32} />
													</FacebookShareButton>
													<TwitterShareButton url={shareUrl}>
														<TwitterIcon size={32} />
													</TwitterShareButton>
													<TelegramShareButton url={shareUrl}>
														<TelegramIcon size={32} />
													</TelegramShareButton>
													<LinkedinShareButton url={shareUrl}>
														<LinkedinIcon size={32} />
													</LinkedinShareButton>
													<WhatsappShareButton url={shareUrl}>
														<WhatsappIcon size={32} />
													</WhatsappShareButton>
													<EmailShareButton url={shareUrl}>
														<EmailIcon size={32} />
													</EmailShareButton>
												</div>
											</Col>
										</Row>
									</div>
								) : (
									<LoadingSpinner color="#cd77d3" />
								)}
							</div>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
