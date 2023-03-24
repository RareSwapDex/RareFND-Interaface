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

export default function Footer() {
	const navigate = useNavigate();
	const { user, logOut } = useContext(AuthContext);
	return (
		<div className="footer_main">
			<Container>
				<div className="text-center footer_logo">
					<img src={FooterLogo} alt="footer_logo" />

					<p>
						The Rare FND organization is a non-profit organization made up of
						rare individuals who are experts in their field that when combined
						form a rare force to help support the ecosystem of all involved with
						Rare FND.{" "}
					</p>
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
				<Row>
					<Col md={4}>
						<div>
							<p>
								{" "}
								<a href="https://www.google.com/maps/search/DSO+IFZA,+IFZA+Properties,+Silicon+Oasis,+Dubai,+UAE/@25.1185768,55.3796655,13.64z">
									DSO IFZA, IFZA Properties, Silicon Oasis, Dubai, UAE.
								</a>
								<br />
								<a href="https://maps.app.goo.gl/zaKNmoRAopMUHWDi9">
									ADDRESS: RARE FND LIMITED, 86-90 Paul Street, London, England,
									EC2A 4NE (14325862){" "}
								</a>{" "}
								<br />
								<a href="https://goo.gl/maps/iGgGPP9MXsUTtdDy6">
									RATBits NFT Marketplace DMCC, 48th floor Almas Towers, JLT,
									Dubai{" "}
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
							<h6>Quick Links</h6>

							<ul>
								<li>
									<a href="/about-us"> About Us </a>
								</li>
								<li>
									<a href="/"> Updates </a>
								</li>
								<li>
									<a href="/"> Events </a>
								</li>
								<li>
									<a
										href="https://rarefnd.zendesk.com/hc/en-gb"
										target="_blank"
										rel="noreferrer"
									>
										{" "}
										Contacts{" "}
									</a>
								</li>
							</ul>
						</div>
					</Col>
					<Col md={2}>
						<div className="social">
							<h6>Help Centre</h6>

							<ul>
								<li>
									<a
										href="https://rarefnd.zendesk.com/hc/en-gb"
										target="_blank"
										rel="noreferrer"
									>
										{" "}
										Support{" "}
									</a>
								</li>
								<li>
									<a href="/signup"> Sign Up </a>
								</li>
								{user ? (
									<li>
										<a href="/login" onClick={logOut}>
											{" "}
											Logout{" "}
										</a>
									</li>
								) : (
									<li>
										<a href="/login"> Login </a>
									</li>
								)}
							</ul>
						</div>
					</Col>
					<Col md={3}>
						<div className="social">
							<h6>Partnerships</h6>

							<ul>
								<li>
									<a href="/partners#crypto-partners">
										{" "}
										Crypto Industry Partners{" "}
									</a>
								</li>
								<li>
									<a href="/"> Media Partners </a>
								</li>
								<li>
									<a href="/"> Non Profit Industry Partners </a>
								</li>
								<li>
									<a href="/"> Incubator Partners </a>
								</li>
								<li>
									<a
										target="_blank"
										rel="noreferrer"
										href="https://rarefnd.zendesk.com/hc/en-gb"
									>
										{" "}
										Partner with Us{" "}
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
							<p>© RareFnd, 2022. All rights reserved.</p>
						</Col>
						<Col md={6}>
							<p className="d-flex justify-content-end">
								{" "}
								<span onClick={() => navigate("/legal")}>
									{" "}
									Legal Disclaimer{" "}
								</span>{" "}
								|{" "}
								<span onClick={() => navigate("/privacy-policy")}>
									{" "}
									Privacy Policy{" "}
								</span>{" "}
								|{" "}
								<span onClick={() => navigate("/terms-of-service")}>
									{" "}
									Terms of Service{" "}
								</span>{" "}
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}
