import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FundMain from "../../assets/home-images/fundraising_main.png";
import "./Fundraising.css";

const Fundraising = () => {
	const navigate = useNavigate();

	return (
		<div className="fundraising_main">
			<Container>
				<Row>
					<Col md={7}>
						<div style={{ paddingTop: "50px" }}>
							<h1>Fundraising solution</h1>
							<p>
								Crowdfunding with the speed and flexibility of our exciting
								technology! Contribution rewards can be delivered in minutes,
								not months using our revolutionary fractionalization and
								steganography technology – a first in the crowdfunding space. We
								offer a simply and quick payment methods for reward based
								campaigns using fiat based payments as well using credit and
								debit cards. We’re a true end to end crowdfunding solution!
							</p>

							<button onClick={() => navigate("/dashboard/projects")}>
								Start Fundraising
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
