import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bitcoinImg from "../../../../assets/home-images/section1.png";
import { useTranslation } from "react-i18next";
import "./introSection.css";

const IntroSection = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Container>
			<Row className="align-items-center">
				<Col md={6}>
					<div className="intro_left">
						<h1>
							{" "}
							<span> {t("home.IntroSection.title.span")} </span>{" "}
							{t("home.IntroSection.title.rest")}
						</h1>
						<p>{t("home.IntroSection.paragraph")}</p>

						<div>
							<button className="sign_up" onClick={() => navigate("/signup")}>
								{t("home.IntroSection.buttons.signUp")}
							</button>{" "}
							<span className="or_span">
								{" "}
								{t("home.IntroSection.buttons.betweenButtons")}{" "}
							</span>
							<button
								className="start_project"
								onClick={() => navigate("/dashboard/new-project")}
							>
								{t("home.IntroSection.buttons.startProject")}
							</button>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div>
						<img src={bitcoinImg} alt="bitcoin" />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default IntroSection;
