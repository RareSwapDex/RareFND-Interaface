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
import LoadingSpinner from "../../components/LoadingSpinner";
import { StarOutlined } from "@ant-design/icons";
import { Image, Avatar } from "antd";
import locationIcon from "../../assets/locationIcon.png";
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import moment from "moment";

import {
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../Context/LanguageContext";

function isArabic(text) {
	const arabicRegex =
		/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
	return arabicRegex.test(text);
}

export default function ProjectCard(props) {
	const { language } = useContext(LanguageContext);
	let api = useAxios();
	let { user } = useContext(AuthContext);
	const [subscribed, setSubscribed] = useState(false);
	const [subscribeButtonText, setSubscribeButtonText] = useState("");
	const [numberOfSubscribers, setNumberOfSubscribers] = useState(
		props.numberOfSubscribers
	);
	const { t } = useTranslation();

	const navigate = useNavigate();
	const location = useLocation();
	const shareUrl = window.location.href;

	useEffect(() => {
		if (subscribed) {
			setSubscribeButtonText(t("project.subscribed"));
		} else {
			setSubscribeButtonText(t("project.subscribe"));
		}
	}, [subscribed, t]);

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
						document.getElementById("subscribe-btn").textContent =
							t("project.subscribed");
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
		<div style={{ boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.25)" }}>
			<Card
				className="border-0 mb-5"
				style={{ backgroundColor: "transparent" }}
			>
				<Row className="w-100" style={{ margin: "0px" }}>
					<Col md={6}>
						<div
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{props.fundingDataUpdated && (
								<div
									style={{
										width: "100%",
										height: "30px",
										color: "white",
									}}
									className="coming-soon-banner center-div"
								>
									{!props.projectLive ? (
										props.projectSuccessfullyEnded === true ? (
											<p style={{ margin: 0 }}>{t("project.successProject")}</p>
										) : props.projectSuccessfullyEnded === false ? (
											<p style={{ margin: 0 }}>{t("project.failedProject")}</p>
										) : (
											<p style={{ margin: 0 }}>{t("project.comingSoon")}</p>
										)
									) : (
										t("project.liveProject")
									)}
								</div>
							)}
							<Image
								src={props.image}
								width="100%"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>

							{/* {!props.projectLive &&
								props.projectSuccessfullyEnded !== false &&
								props.projectSuccessfullyEnded !== true && (
									<div
										style={{
											width: "100%",
											height: "30px",
											color: "white",
											display: "none",
										}}
										className="coming-soon-banner center-div"
									>
										<p style={{ margin: 0 }}>{t("project.comingSoon")}</p>
									</div>
								)} */}
						</div>
					</Col>
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
								style={{
									display: "flex",
									alignItems: "left",
									justifyContent: "space-between",
									backgroundColor: "white",
									margin: window.innerWidth > 1000 ? "0 200 0 200" : "0",
									padding: "2% 5% 2% 5%",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
									}}
								>
									{props.projectLive &&
										props.projectLiveDatetime &&
										props.deadline && (
											<p className="m-0 p-0">
												<span
													className="gradientText"
													style={{ fontSize: "2.2rem", fontWeight: "bold" }}
												>
													{moment(props.projectLiveDatetime)
														.add(Number(props.deadline), "days")
														.diff(moment(), "days")}
												</span>{" "}
												<span style={{ color: "gray" }}>
													{t("project.daysToGo")}
												</span>
											</p>
										)}
									<div style={{ display: "flex" }}>
										{props.incentivesData &&
											props.incentivesData.length > 0 && (
												<button
													className="primaryButton px-2 py-1"
													onClick={() => {
														const element =
															document.getElementById("project-rewards");
														if (element) {
															element.scrollIntoView({ block: "start" });
														}
													}}
												>
													{t("project.rewards")}
												</button>
											)}
										{document.getElementById("project-description") && (
											<button
												className={`primaryButton ${
													props.incentivesData &&
													props.incentivesData.length > 0 &&
													"mx-2 px-2 py-1"
												}`}
												onClick={() => {
													const element = document.getElementById(
														"project-description"
													);
													if (element) {
														element.scrollIntoView({ block: "start" });
													}
												}}
											>
												{t("project.description")}
											</button>
										)}
									</div>
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
										<h1 style={{ margin: "0", padding: "0" }}>
											<Card.Title
												style={{
													fontSize: "x-large",
												}}
											>
												{props.title}
											</Card.Title>
										</h1>

										<div>
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
													to={`/profile/${props.ownerUsername}`}
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
																{t("project.project_owner")}
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
												className={
													isArabic(props.text) ? "text-rtl" : "text-ltr"
												}
												style={{
													fontSize: "1.1rem",
													color: "grey",
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
														<div className="center-div">
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
																	{t("project.total_of")}{" "}
																	{props.number_of_donators}{" "}
																	{t("project.contributors")}
																</p>
															</a>
														</div>
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
														<div className="center-div mt-3">
															<p style={{ margin: "0" }}>
																{`${numberOfSubscribers} ${t(
																	"project.subscribers"
																)}`}
															</p>
														</div>
													</div>
												)
											)}
										</div>
										<hr style={{ marginBottom: "10px 0 10px 0" }} />

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
														<p style={{ margin: "0", padding: "0" }}>
															{t("project.share")}:{" "}
														</p>
													</div>
													<FacebookShareButton
														url={shareUrl}
														quote={
															"Turn the vision of " +
															props.title +
															" into reality! Check out this brilliant project"
														}
													>
														<FacebookIcon size={32} />
													</FacebookShareButton>
													<TwitterShareButton
														title={
															"Turn the vision of " +
															props.title +
															" into reality! Check out this brilliant project on @Rare_Fnd"
														}
														url={shareUrl}
													>
														<TwitterIcon size={32} />
													</TwitterShareButton>
													<TelegramShareButton
														title={
															"Turn the vision of " +
															props.title +
															" into reality! Check out this brilliant project on @RareFnd"
														}
														url={shareUrl}
													>
														<TelegramIcon size={32} />
													</TelegramShareButton>
													<LinkedinShareButton
														url={shareUrl}
														title={props.title}
														summary={
															"Turn the vision of " +
															props.title +
															" into reality! Check out this brilliant project"
														}
													>
														<LinkedinIcon size={32} />
													</LinkedinShareButton>
													<WhatsappShareButton
														url={shareUrl}
														title={
															"Turn the vision of " +
															props.title +
															" into reality! Check out this brilliant project"
														}
													>
														<WhatsappIcon size={32} />
													</WhatsappShareButton>
													<EmailShareButton
														url={shareUrl}
														subject={props.title}
														body={
															"Turn the vision of " +
															props.title +
															" into reality! Check out this brilliant project"
														}
													>
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
