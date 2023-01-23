import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import ContributeBtn from "../Web3ContributeButton";

export default function Incentive(props) {
	const included_incentives = props.included_incentives;
	return (
		<div
			className="incentive border-1 mx-auto w-100"
			style={{
				width: "80%",
				marginLeft: "1vw",
				border: "1px solid",
				padding: "10px",
				marginBottom: "10px",
				borderColor: "#DBDEDD",
			}}
		>
			<p className="incentive-price" style={{ fontSize: "20px" }}>
				Contribute ${props.price} or more
			</p>
			<p
				className="incentive-title"
				style={{ fontSize: "15px", fontWeight: "bold" }}
			>
				{props.title}
			</p>
			<p className="incentive-description" style={{ fontSize: "13px" }}>
				{props.description}
			</p>
			{Array.from(included_incentives).length > 0 && (
				<div>
					<p
						className="incentive-includes fw-bold"
						style={{ fontSize: "15px" }}
					>
						INCLUDES:
					</p>
					<ul className="included-incentives" style={{ fontSize: "13px" }}>
						{Array.from(included_incentives).map((_, idx) => (
							<li>{_}</li>
						))}
					</ul>
				</div>
			)}

			<p className="estimated-delivery" style={{ fontSize: "13px" }}>
				<span className="fw-bold">ESTIMATED DELIVERY</span>
				<br />
				{new Date(props.estimated_delivery).toDateString()}
			</p>
			<Row>
				<Col>
					<div
						style={{
							fontSize: "13px",
							borderRadius: "5px",
							height: "35px",
							background: "#E6F9F0",
						}}
						className="d-flex"
					>
						<div className="reserved-incentives d-flex w-100 justify-content-center align-self-center">
							{props.reserved} Contributors
						</div>
					</div>
				</Col>
				<Col>
					<div
						style={{
							fontSize: "13px",
							borderRadius: "5px",
							height: "35px",
							background: "#FFF1EC",
						}}
						className="d-flex"
					>
						<div className="limited-incentives d-flex w-100 justify-content-center align-self-center">
							{props.available_items} Left
						</div>
					</div>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col md={7}>
					<div
						style={{
							border: "1px solid",
							borderColor: "#DBDEDD",
							height: "35px",
						}}
					>
						<input
							id={`contribute-amount-2-${props.index}`}
							autoComplete="off"
							type="text"
							pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
							placeholder={" $  " + `+${props.price}`}
							style={{ outline: "none", border: "none" }}
							className="w-100 h-100"
							onKeyPress={(e) => {
								if (
									(e.key === "." &&
										(e.target.value.includes(".") || e.target.value === "")) ||
									(!/^[0-9]/.test(e.key) && !/^[.]/.test(e.key))
								) {
									e.preventDefault();
								}
								!/^[0-9]/.test(e.key) &&
									!/^[.]/.test(e.key) &&
									!e.target.value.includes(".") &&
									e.preventDefault();
							}}
							value={props.price}
						/>
					</div>
				</Col>
				<Col md={5}>
					<Button
						className="text-center mx-auto"
						style={{
							height: "35px",
							borderRadius: "0px",
							fontSize: "13px",
							background: "#008858",
							border: "none",
							width: "100%",
						}}
						disabled={!props.projectLive}
						onClick={() => {
							document.getElementById("contribute-amount").value =
								document.getElementById(
									`contribute-amount-2-${props.index}`
								).value;
							const element = document.getElementById("contribute-amount");
							if (element) {
								element.scrollIntoView({ block: "center" });
							}
						}}
					>
						CONTINUE
					</Button>
				</Col>
			</Row>
		</div>
	);
}
