import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FundMain from "../../../../assets/home-images/fundraising_main.png";
import "./Fundraising.css";
import { useTranslation } from "react-i18next";

const Fundraising = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="fundraising_main">
			<Container>
				<Row>
					<Col md={7}>
						<div style={{ paddingTop: "50px" }}>
							<h1>{t("home.fundraisingSolution.title")}</h1>
							<p>{t("home.fundraisingSolution.paragraph")}</p>

							<button onClick={() => navigate("/dashboard/new-project")}>
								{t("home.fundraisingSolution.button")}
							</button>
						</div>
					</Col>
					<Col md={5}>
						<img src={FundMain} alt="fund_main" />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Fundraising;
