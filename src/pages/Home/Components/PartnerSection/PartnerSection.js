import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PartnerLeft from "../../../../assets/home-images/partner_left.png";
import PartnerRight from "../../../../assets/home-images/partner_right.png";
import { useTranslation } from "react-i18next";
import "./PartnerSection.css";

const PartnerSection = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Container className="mt-5 box_animate1">
			<Row className="align-items-center">
				<Col md={6} className="partner_left_img">
					<img src={PartnerLeft} alt="left" />
				</Col>
				<Col md={6}>
					<div className="key_partner">
						<h2>{t("home.partners.card1.title")}</h2>
						<p>{t("home.partners.card1.paragraph")}</p>

						<button
							className="learn_more mt-5"
							onClick={() => navigate("/about-us")}
						>
							{t("home.partners.button")}
						</button>
					</div>
				</Col>
				<Col md={6} className="box_animate2">
					<div className="key_partner">
						<h2>{t("home.partners.card2.title")}</h2>
						<p>{t("home.partners.card2.paragraph")}</p>

						<button
							className="learn_more"
							onClick={() => navigate("/about-us")}
						>
							{t("home.partners.button")}
						</button>
					</div>
				</Col>
				<Col
					md={6}
					style={{ paddingLeft: 0, marginTop: "-1px" }}
					className="partner_right_img"
				>
					<img src={PartnerRight} alt="left" />
				</Col>
			</Row>
		</Container>
	);
};

export default PartnerSection;
