import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Mission.css";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../../Context/LanguageContext";

const Mission = () => {
	const navigate = useNavigate();
	const { language } = useContext(LanguageContext);
	const { t } = useTranslation();

	return (
		<Container>
			<div className="mission_main">
				<Container fluid>
					<Row>
						{language !== "arabic" && (
							<Col md={5} className="mission_box1"></Col>
						)}
						<Col md={6}>
							<div className="mission_text">
								<h1>{t("home.mission.title")}</h1>
								<h4>{t("home.mission.subTitle")}</h4>
								<p>{t("home.mission.paragraph")}</p>

								<button onClick={() => navigate("/dashboard/new-project")}>
									{t("home.mission.button")}
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</Container>
	);
};

export default Mission;
