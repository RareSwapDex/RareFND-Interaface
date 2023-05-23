import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import FooterLogo from "../../assets/home-images/main_logo.png";
import fb from "../../assets/home-images/fb.png";
import insta from "../../assets/home-images/insta.png";
import twitter from "../../assets/home-images/twitter.png";
import linkdln from "../../assets/home-images/linkdln.png";
import email from "../../assets/home-images/email.png";
import phone from "../../assets/home-images/phone.png";
import "bootstrap/dist/css/bootstrap.css";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { user, logOut } = useContext(AuthContext);
	return (
		<div className="footer_main">
			<Container>
				<div className="text-center footer_logo">
					<img src={FooterLogo} alt="footer_logo" />

					<p>{t("footer.text")}</p>
				</div>
			</Container>

			<div className="social_icons text-center mt-5">
				<a
					href="https://www.facebook.com/100085127265025/"
					target="_blank"
					rel="noreferrer"
				>
					{" "}
					<img src={fb} alt="" />{" "}
				</a>
				<a
					href="https://www.instagram.com/rarefnd/"
					target="_blank"
					rel="noreferrer"
				>
					{" "}
					<img src={insta} alt="" />{" "}
				</a>
				<a href="https://twitter.com/rare_fnd" target="_blank" rel="noreferrer">
					{" "}
					<img src={twitter} alt="" />{" "}
				</a>
				<a
					href="https://uk.linkedin.com/company/therareage"
					target="_blank"
					rel="noreferrer"
				>
					{" "}
					<img src={linkdln} alt="" />{" "}
				</a>
			</div>

			<Container className="footer_links">
				<Row className="w-100" style={{ paddingLeft: "10px" }}>
					<Col md={4}>
						<div>
							<p>
								{" "}
								<a href="https://www.google.com/maps/search/DSO+IFZA,+IFZA+Properties,+Silicon+Oasis,+Dubai,+UAE/@25.1185768,55.3796655,13.64z">
									{t("footer.addresses.1")}
								</a>
								<br />
								<a href="https://maps.app.goo.gl/zaKNmoRAopMUHWDi9">
									{t("footer.addresses.2")}
								</a>{" "}
								<br />
								<a href="https://goo.gl/maps/iGgGPP9MXsUTtdDy6">
									{t("footer.addresses.3")}
								</a>
							</p>

							<div className="d-flex justify-content-between">
								<p style={{ fontSize: "15px", color: "#6d7783" }}>
									<img src={email} alt="" />{" "}
									<a href="mailto:help@rarefnd.com"> help@rarefnd.com </a>{" "}
								</p>
							</div>
						</div>
					</Col>
					<Col md={3} className="quick_link">
						<div className="social">
							<h6>{t("footer.quickLinks.title")}</h6>

							<ul>
								<li>
									<a href="/about-us"> {t("footer.quickLinks.1")} </a>
								</li>
								<li>
									<a href="/"> {t("footer.quickLinks.2")} </a>
								</li>
								<li>
									<a href="/"> {t("footer.quickLinks.3")} </a>
								</li>
								<li>
									<a
										href="https://rarefnd.zendesk.com/hc/en-gb"
										target="_blank"
										rel="noreferrer"
									>
										{t("footer.quickLinks.4")}
									</a>
								</li>
							</ul>
						</div>
					</Col>
					<Col md={2}>
						<div className="social">
							<h6>{t("footer.helpCenter.title")}</h6>

							<ul>
								<li>
									<a
										href="https://rarefnd.zendesk.com/hc/en-gb"
										target="_blank"
										rel="noreferrer"
									>
										{t("footer.helpCenter.1")}
									</a>
								</li>
								{!user && (
									<li>
										<a href="/signup"> {t("footer.helpCenter.2")} </a>
									</li>
								)}
								{user ? (
									<li>
										<a href="/login" onClick={logOut}>
											{t("footer.helpCenter.3")}
										</a>
									</li>
								) : (
									<li>
										<a href="/login"> {t("footer.helpCenter.4")} </a>
									</li>
								)}
							</ul>
						</div>
					</Col>
					<Col md={3}>
						<div className="social">
							<h6>{t("footer.partnerships.title")}</h6>

							<ul>
								<li>
									<a href="/partners#crypto-partners">
										{t("footer.partnerships.1")}
									</a>
								</li>
								<li>
									<a href="/"> {t("footer.partnerships.2")} </a>
								</li>
								<li>
									<a href="/"> {t("footer.partnerships.3")} </a>
								</li>
								<li>
									<a href="/"> {t("footer.partnerships.4")} </a>
								</li>
								<li>
									<a
										target="_blank"
										rel="noreferrer"
										href="https://rarefnd.zendesk.com/hc/en-gb"
									>
										{t("footer.partnerships.5")}
									</a>
								</li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>

			<div className="right_reserved">
				<Container>
					<Row>
						<Col md={6}>
							<p>{t("footer.rights")}</p>
						</Col>
						<Col md={6}>
							<p className="d-flex justify-content-end">
								{" "}
								<span onClick={() => navigate("/legal")}>
									{t("footer.legalDisclaimer")}
								</span>{" "}
								|{" "}
								<span onClick={() => navigate("/privacy-policy")}>
									{t("footer.privacyPolicy")}
								</span>{" "}
								|{" "}
								<span onClick={() => navigate("/terms-of-service")}>
									{t("footer.termsOfService")}
								</span>{" "}
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}
