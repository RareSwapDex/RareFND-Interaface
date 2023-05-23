import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useTranslation } from "react-i18next";

export default function ProjectCurrentContributions(props) {
	const id = props.projectId;
	const [projectData, setProjectData] = useState(null);
	const [usdRaisedAmount, setUsdRaisedAmount] = useState(0);
	const { t } = useTranslation();
	useEffect(() => {
		let interval = setInterval(() => {
			axios
				.get(process.env.REACT_APP_BASE_URL + `/api/project/${id}/`)
				.then((response) => response.data)
				.then((data) => {
					setProjectData(data);
					setUsdRaisedAmount(Number(data.raised_amount) + data.current_reward);
					if (
						Number(data.raised_amount) + data.current_reward >=
						data.fund_amount
					) {
						props.setProjectSuccessfullyEnded(true);
					} else if (!data.live && data.project_live_datetime) {
						props.setProjectSuccessfullyEnded(false);
					}
					props.setFundingDataUpdated(true);
				});
		}, 1000 * 5);
		// props.setFundingDataUpdated(true);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="project-current-contributions p-5"
			style={{
				background:
					"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
				color: "white",
			}}
		>
			{projectData ? (
				<div>
					<Row className="justify-content-md-center">
						<Col md={12} className="text-center" style={{ color: "white" }}>
							<h1 className="display-6 fw-bold" style={{ color: "white" }}>
								{`$ ${
									Number(usdRaisedAmount).toLocaleString(undefined, {
										minimumFractionDigits: 2,
									})
									// .toFixed(2).toLocaleString()
								} / ${projectData.fund_amount.toLocaleString()}`}
							</h1>
							<ProgressBar
								animated
								variant="dark"
								now={(usdRaisedAmount / Number(projectData.fund_amount)) * 100}
								label={`${(
									(usdRaisedAmount / Number(projectData.fund_amount)) *
									100
								).toFixed(2)}%`}
								className="mx-auto"
								style={{ width: "50%", height: "20px" }}
							/>
						</Col>
					</Row>

					<Row className="justify-content-md-center mt-5">
						<Col md={6} className="text-center mt-1" style={{ color: "black" }}>
							<div
								className="h3 fw-bold text-light fw-bold"
								style={{
									// fontFamily: "'Kaisei Opti', sans-serif",
									whiteSpace: "pre-line",
								}}
							>
								{t("project.APYReward")}
							</div>
							<div
								className="display-6 fw-bold"
								style={{
									// fontFamily: "'Kaisei Opti', sans-serif",
									whiteSpace: "pre-line",
									color: "white",
								}}
							>
								{`$ ${Number(projectData.current_reward).toFixed(2)}`}
							</div>
						</Col>
						<Col md={6} className="text-center mt-1" style={{ color: "black" }}>
							<div
								className="h3 fw-bold text-white fw-bold"
								style={{
									// fontFamily: "'Kaisei Opti', sans-serif",
									color: "white",
								}}
							>
								{t("project.rareFndReward")}
							</div>
							<div
								className="display-6 fw-bold"
								style={{
									// fontFamily: "'Kaisei Opti', sans-serif",
									whiteSpace: "pre-line",
									color: "white",
								}}
							>
								$ {Number(projectData.rewarded_amount).toLocaleString()}
							</div>
						</Col>
					</Row>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
