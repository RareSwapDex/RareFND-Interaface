import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HiringImg1 from "../../assets/home-images/hiring_img1.png";
import HiringImg2 from "../../assets/home-images/hiring_img2.png";
import HiringImg3 from "../../assets/home-images/hiring_img3.png";
import "./Hiring.css";

const Hiring = () => {
	const navigate = useNavigate();

	return (
		<div className="hiring_main">
			<Container>
				<Row>
					<Col md={4} className="mb-5">
						<Card className="hiring_box1">
							<Card.Img variant="top" src={HiringImg1} />
							<Card.Body>
								<Card.Title>Free And More</Card.Title>
								<Card.Text>
									It’s not only free to fundraise — but we’ll also help you meet
									your goal! We’re currently offering campaigns 10% toward their
									fundraising target. YES, we’re paying you to launch your
									fundraising campaign n Rare FND!
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4} className="mb-5">
						<Card>
							<Card.Img variant="top" src={HiringImg2} />
							<Card.Body>
								<Card.Title>Incentives</Card.Title>
								<Card.Text>
									Your incentives for contribution tiers are embedded in our
									technology which can be bought, sold, traded or used. From
									event tickets to gift cards – It’s easy to deliver. No
									complications or expense of shipping items which allow you to
									better fund your project and opens up the usefulness of the
									reward to a worldwide audience
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4} className="mb-5">
						<Card className="hiring_box3">
							<Card.Img variant="top" src={HiringImg3} />
							<Card.Body>
								<Card.Title>Safe For Investors</Card.Title>
								<Card.Text>
									All of the contributions by investors in your campaign are
									autostaked in our platform. This provides the ultimate in
									safety for the contributors due to the fact that if a campaign
									fails to reach its fundraising goal, the funds are returned to
									the contributor PLUS any staking rewards that were earned
									during the campaign!
								</Card.Text>
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
								Work Better, Together
							</a>
							<a
								className="hire_rare"
								href="https://t.me/RareFnd"
								target="_blank"
								rel="noreferrer"
							>
								Hire a Rare Fund Expert
							</a>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Hiring;
