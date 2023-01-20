import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./index.css";
import { Link } from "react-router-dom";

function MainCard(props) {
	return (
		<Container>
			<Card
				className={"border-0 " + (props.backgroundColor ? "" : "bg-dark")}
				style={{ backgroundColor: props.backgroundColor }}
			>
				<Row>
					{props.image ? (
						<Col
							md={props.horizontal ? 6 : 12}
							className={props.imageLeft ? "order-1" : "order-0"}
						>
							<div
								style={
									props.multi_cards ? { width: "100px", margin: "auto" } : {}
								}
							>
								<a href={props.buttonHref}>
									<Card.Img
										variant="left"
										src={props.image}
										className="w-100"
										style={
											props.multi_cards
												? {
														objectFit: "cover",
														width: "100px",
														margin: "auto",
												  }
												: {
														objectFit: "cover",
														width: "25rem",
														height: props.image_height,
														float: props.imageLeft ? "right" : "left",
														padding: "0% 20% 0% 20%",
												  }
										}
									/>
								</a>
							</div>
						</Col>
					) : null}
					<Col md={props.image && !props.multi_cards ? 6 : 12}>
						<Card.Body className="text-light">
							<Card.Title
								className={
									(props.project_title ? "display-5 " : "display-6 ") +
									"fw-bold text-center mb-5"
								}
								style={{ color: "#3d3d3d" }}
							>
								{props.title}
							</Card.Title>
							<Card.Text
								className={
									(props.multi_cards
										? "p "
										: props.project_header
										? "h4 "
										: "h5 ") +
									(!props.image || props.center_card_text
										? "mx-auto mb-4 text-center"
										: "")
								}
								style={props.textStyle}
							>
								{props.text}
							</Card.Text>
							{props.buttonText ? (
								<Row>
									<Col className={"mt-2 " + (props.image ? "" : "text-center")}>
										<Link to={props.buttonHref}>
											<Button
												className="rise-button"
												style={{
													lineHeight: "1.6",
													fontSize: "1rem",
												}}
												variant="warning"
												size="lg"
											>
												{props.buttonText}
												<i
													className="fa fa-arrow-right"
													style={{ padding: "12px 13px" }}
												></i>
											</Button>
										</Link>
									</Col>
								</Row>
							) : null}
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</Container>
	);
}

export default MainCard;
