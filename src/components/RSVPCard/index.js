import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import "./index.css";
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
import { Button, Modal, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../Context/LanguageContext";
import axios from "axios";

function isArabic(text) {
	const arabicRegex =
		/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
	return arabicRegex.test(text);
}

export default function ProjectCard(props) {
	const { language } = useContext(LanguageContext);
	const [messageApi, contextHolder] = message.useMessage();
	const { RSVPData } = props;
	let api = useAxios();
	let { user } = useContext(AuthContext);
	const [subscribed, setSubscribed] = useState(false);
	const [subscribeButtonText, setSubscribeButtonText] = useState("");
	const [numberOfSubscribers, setNumberOfSubscribers] = useState(
		RSVPData.number_of_subscribers
	);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [formData, setFormData] = useState({ name: "", email: "" });

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

	const subscribeToProject = () => {
		axios
			.put(process.env.REACT_APP_BASE_URL + `/api/rsvp/subscribe/`, {
				rsvpTitle: RSVPData.title,
				email: formData.email,
				name: formData.name,
			})
			.then((response) => {
				if (response.status === 200) {
					setSubscribed(true);
					messageApi.open({
						type: "success",
						content: "You have successfully RSVPed.",
					});
					setNumberOfSubscribers(numberOfSubscribers + 1);
					setIsModalVisible(false);
				} else {
					messageApi.open({
						type: "error",
						content: "There was an error in your RSVP.",
					});
					setIsModalVisible(false);
				}
				setConfirmLoading(false);
			});
	};

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		form
			.validateFields()
			.then((values) => {
				subscribeToProject();
			})
			.catch((info) => {
				console.log("Validation Failed:", info);
			});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setConfirmLoading(false);
	};

	return (
		<div style={{ boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.25)" }}>
			{contextHolder}
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
							<div
								style={{
									width: "100%",
									height: "30px",
									color: "white",
								}}
								className="coming-soon-banner center-div"
							>
								{RSVPData.live ? t("rsvp.live") : t("rsvp.finished")}
							</div>
							<Image
								src={RSVPData.thumbnail}
								width="100%"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
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
									{RSVPData.live &&
										RSVPData.live_datetime &&
										RSVPData.deadline && (
											<p className="m-0 p-0">
												<span
													className="gradientText"
													style={{ fontSize: "2.2rem", fontWeight: "bold" }}
												>
													{moment(RSVPData.live_datetime)
														.add(Number(RSVPData.deadline), "days")
														.diff(moment(), "days")}
												</span>{" "}
												<span style={{ color: "gray" }}>
													{t("project.daysToGo")}
												</span>
											</p>
										)}
									<div style={{ display: "flex" }}>
										{/* {props.incentivesData &&
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
											)} */}
										{document.getElementById("project-description") && (
											<button
												className={`primaryButton `}
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
											{RSVPData.title}
										</Card.Title>
									</h1>

									<div>
										<div style={{ display: "flex" }}>
											<div style={{ width: "64px" }}>
												<Avatar
													style={{ width: 64, height: 64 }}
													src={
														<Image
															src={RSVPData.owner_profile_picture}
															style={{ width: 64, height: 64 }}
														/>
													}
												/>
											</div>
											<Link
												to={`/profile/${RSVPData.owner_username}`}
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
															{RSVPData.owner_username !== "dean"
																? RSVPData.owner_username
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
												isArabic(RSVPData.head) ? "text-rtl" : "text-ltr"
											}
											style={{
												fontSize: "1.1rem",
												color: "grey",
												whiteSpace: "pre-wrap",
											}}
										>
											{RSVPData.head}
										</Card.Text>
									</div>
									<br />
									<div className="center-div h-100">
										<Button
											type="primary"
											onClick={showModal}
											className="primaryButton-all-radius"
											id="subscribe-btn"
										>
											Confirm Attendance
										</Button>
										<Modal
											title="Please RSVP to confirm your attendance"
											visible={isModalVisible}
											onOk={handleOk}
											onCancel={handleCancel}
											okText="Submit"
											cancelText="Cancel"
											confirmLoading={confirmLoading}
											centered
										>
											<Form
												form={form}
												name="rsvp"
												initialValues={{ remember: true }}
											>
												<Form.Item
													label="Name"
													name="name"
													rules={[
														{
															required: true,
															message: "Please input your name!",
														},
													]}
												>
													<Input
														onChange={(e) =>
															setFormData({ ...formData, name: e.target.value })
														}
													/>
												</Form.Item>

												<Form.Item
													label="Email"
													name="email"
													rules={[
														{
															required: true,
															message: "Please input your email!",
															type: "email",
														},
													]}
												>
													<Input
														onChange={(e) =>
															setFormData({
																...formData,
																email: e.target.value,
															})
														}
													/>
												</Form.Item>
											</Form>
										</Modal>
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
													{RSVPData.address}
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
													quote={"Checkout the " + RSVPData.title}
												>
													<FacebookIcon size={32} />
												</FacebookShareButton>
												<TwitterShareButton
													title={"Checkout the " + RSVPData.title}
													url={shareUrl}
												>
													<TwitterIcon size={32} />
												</TwitterShareButton>
												<TelegramShareButton
													title={"Checkout the " + RSVPData.title}
													url={shareUrl}
												>
													<TelegramIcon size={32} />
												</TelegramShareButton>
												<LinkedinShareButton
													url={shareUrl}
													title={RSVPData.title}
													summary={"Checkout the " + RSVPData.title}
												>
													<LinkedinIcon size={32} />
												</LinkedinShareButton>
												<WhatsappShareButton
													url={shareUrl}
													title={"Checkout the " + RSVPData.title}
												>
													<WhatsappIcon size={32} />
												</WhatsappShareButton>
												<EmailShareButton
													url={shareUrl}
													subject={RSVPData.title}
													body={"Checkout the " + RSVPData.title}
												>
													<EmailIcon size={32} />
												</EmailShareButton>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
