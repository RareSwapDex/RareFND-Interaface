import "bootstrap/dist/css/bootstrap.css";
import "./descriptionStyle.css";
import Incentives from "../Incentives";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { Image, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default function ProjectDescription(props) {
	const { t } = useTranslation();

	let incentivesData = props.incentivesData;
	console.log(incentivesData);
	if (incentivesData) {
		// Separate items with display_order and items without
		let withDisplayOrder = incentivesData.filter(
			(item) => item.display_order !== null
		);
		let withoutDisplayOrder = incentivesData.filter(
			(item) => item.display_order === null
		);

		// Sort items by price
		withoutDisplayOrder.sort((a, b) => a.price - b.price);

		// Sort items with display_order by the order value
		withDisplayOrder.sort((a, b) => a.display_order - b.display_order);

		// Insert items with display_order into the sorted array
		for (let item of withDisplayOrder) {
			withoutDisplayOrder.splice(item.display_order - 1, 0, item);
		}

		// Final sorted array
		incentivesData = withoutDisplayOrder;
	}
	return (
		<div
			className="project-description bg-white w-100"
			id="project-description"
			style={{
				padding: "5vw",
			}}
		>
			<div className="d-none d-md-block">
				<Row>
					<Col md={8}>
						<div
							dangerouslySetInnerHTML={{ __html: props.description }}
							style={{
								maxWidth: "100vw",
							}}
						></div>
					</Col>
					<Col md={4}>
						<div
							className="mx-auto"
							style={{
								width: "80%",
								marginLeft: "1vw",
								border: "1px solid",
								padding: "10px",
								marginBottom: "10px",
								borderColor: "#DBDEDD",
							}}
						>
							<Link
								to={`/profile/${props.ownerUsername}`}
								style={{ textDecoration: "none" }}
							>
								<div className="centerDiv" style={{ color: "black" }}>
									{t("project.projectBy")}
								</div>
								<div className="centerDiv">
									<div className="mb-4">
										<Avatar
											style={{ width: 80, height: 80 }}
											src={
												<Image
													src={props.ownerProfilePicture}
													style={{ width: 80, height: 80 }}
												/>
											}
										/>
									</div>
								</div>

								<div
									className="centerDiv"
									style={{ textDecoration: "underline", color: "Dark" }}
								>
									<h3>
										{props.ownerUsername !== "dean"
											? props.ownerUsername
											: "AURA SKYPOOL"}
									</h3>
								</div>
							</Link>
						</div>
						{incentivesData && incentivesData.length > 0 && (
							<div>
								<h1 className="text-center" id="project-rewards">
									{t("project.rewards")}
								</h1>
								{incentivesData &&
									Array.from(incentivesData).map((_, idx) => (
										<Incentives
											incentiveId={_.id}
											title={_.title}
											description={_.description}
											included_incentives={_.included_incentives}
											estimated_delivery={_.estimated_delivery}
											available_items={_.available_items}
											price={_.price}
											reserved={_.reserved}
											project={_.project}
											projectLive={props.projectLive}
											index={idx}
											projectData={props.projectData}
											setSelectedIncentive={(id) =>
												props.setSelectedIncentive(id)
											}
										/>
									))}
							</div>
						)}
					</Col>
				</Row>
			</div>
			{/* Displayed for smaller screens */}
			<div className="d-block d-md-none">
				<Tabs defaultActiveKey="1">
					<TabPane tab="Description" key="1">
						<div
							dangerouslySetInnerHTML={{ __html: props.description }}
							style={{
								maxWidth: "100vw",
							}}
						></div>
						<div
							dangerouslySetInnerHTML={{ __html: props.description }}
							style={{ maxWidth: "100vw" }}
						></div>
					</TabPane>
					<TabPane tab="Rewards" key="2">
						{/* Rewards content here */}
						{incentivesData && incentivesData.length > 0 && (
							<div>
								<h1 className="text-center" id="project-rewards">
									{t("project.rewards")}
								</h1>
								<div>
									<div
										className="mx-auto"
										style={{
											width: "80%",
											marginLeft: "1vw",
											border: "1px solid",
											padding: "10px",
											marginBottom: "10px",
											borderColor: "#DBDEDD",
										}}
									>
										<Link
											to={`/profile/${props.ownerUsername}`}
											style={{ textDecoration: "none" }}
										>
											<div className="centerDiv" style={{ color: "black" }}>
												{t("project.projectBy")}
											</div>
											<div className="centerDiv">
												<div className="mb-4">
													<Avatar
														style={{ width: 80, height: 80 }}
														src={
															<Image
																src={props.ownerProfilePicture}
																style={{ width: 80, height: 80 }}
															/>
														}
													/>
												</div>
											</div>

											<div
												className="centerDiv"
												style={{ textDecoration: "underline", color: "Dark" }}
											>
												<h3>
													{props.ownerUsername !== "dean"
														? props.ownerUsername
														: "AURA SKYPOOL"}
												</h3>
											</div>
										</Link>
									</div>
									{incentivesData && incentivesData.length > 0 && (
										<div>
											<h1 className="text-center" id="project-rewards">
												{t("project.rewards")}
											</h1>
											{incentivesData &&
												Array.from(incentivesData).map((_, idx) => (
													<Incentives
														incentiveId={_.id}
														title={_.title}
														description={_.description}
														included_incentives={_.included_incentives}
														estimated_delivery={_.estimated_delivery}
														available_items={_.available_items}
														price={_.price}
														reserved={_.reserved}
														project={_.project}
														projectLive={props.projectLive}
														index={idx}
														projectData={props.projectData}
														setSelectedIncentive={(id) =>
															props.setSelectedIncentive(id)
														}
													/>
												))}
										</div>
									)}
								</div>
							</div>
						)}
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}
