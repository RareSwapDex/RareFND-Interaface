import React, { useContext } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HiringImg1 from "../../../../assets/home-images/hiring_img1.png";
import HiringImg2 from "../../../../assets/home-images/hiring_img2.png";
import HiringImg3 from "../../../../assets/home-images/hiring_img3.png";
import "./Hiring.css";
import { useTranslation } from "react-i18next";

const Hiring = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="hiring_main">
			<Container>
				<Row>
					<Col md={4} className="mb-5">
						<Card className="hiring_box1">
							<Card.Img variant="top" src={HiringImg1} />
							<Card.Body>
								<Card.Title>{t("home.hiring.1.title")}</Card.Title>
								<Card.Text>{t("home.hiring.1.paragraph")}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4} className="mb-5">
						<Card>
							<Card.Img variant="top" src={HiringImg2} />
							<Card.Body>
								<Card.Title>{t("home.hiring.2.title")}</Card.Title>
								<Card.Text>{t("home.hiring.2.paragraph")}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4} className="mb-5">
						<Card className="hiring_box3">
							<Card.Img variant="top" src={HiringImg3} />
							<Card.Body>
								<Card.Title>{t("home.hiring.3.title")}</Card.Title>
								<Card.Text>{t("home.hiring.3.paragraph")}</Card.Text>
							</Card.Body>
						</Card>
					</Col>

					<Col md={12}>
						<div className="text-center mt-3">
							<a
								className="work_together"
								href="https://t.me/RareFnd"
								target="_blank"
								rel="noreferrer"
							>
								{t("home.hiring.button1")}
							</a>
							<a
								className="hire_rare"
								href="https://t.me/RareFnd"
								target="_blank"
								rel="noreferrer"
							>
								{t("home.hiring.button2")}
							</a>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Hiring;
