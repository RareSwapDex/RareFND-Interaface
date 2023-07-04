import "bootstrap/dist/css/bootstrap.css";
import "./descriptionStyle.css";
import Incentives from "../Incentives";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { Image, Avatar } from "antd";
import { useTranslation } from "react-i18next";

export default function ProjectDescription(props) {
	const { t } = useTranslation();

	let incentivesData = props.incentivesData;
	if (incentivesData) {
		incentivesData.sort(function (a, b) {
			var x = a.price;
			var y = b.price;
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}
	return (
		<div
			className="project-description bg-white w-100"
			id="project-description"
			style={{
				padding: "5vw",
			}}
		>
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
								{/* <img
									id="profileImage"
									className="rounded-circle"
									width="80"
									src={
										props.owner_profile_picture
											? props.owner_profile_picture
											: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
									}
								></img> */}
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
	);
}
