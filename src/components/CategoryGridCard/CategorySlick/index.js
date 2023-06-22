import Slider from "react-slick";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "./index.css";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../Context/LanguageContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Progress } from "antd";
import { Container } from "react-bootstrap";

export default function CategorySlick(props) {
	const { language } = useContext(LanguageContext);

	const CustomArrowLeft = ({ className, style, onClick }) => (
		<FiArrowLeft
			className={className}
			style={{
				...style,
				fontSize: "30px",
				color: "black",
				position: "absolute",
				top: "50%",
				left: "5",
				zIndex: "1",
				transform: "translate(-50%, -50%)",
			}}
			onClick={onClick}
		/>
	);

	const CustomArrowRight = ({ className, style, onClick }) => (
		<FiArrowRight
			className={className}
			style={{
				...style,
				fontSize: "30px",
				color: "black",
				position: "absolute",
				top: "50%",
				right: language === "arabic" ? "" : "5",
				left: language === "arabic" ? "98%" : "",
				zIndex: "1",
				transform: "translate(50%, -50%)",
			}}
			onClick={onClick}
		/>
	);

	function truncateText(text, maxLength = 70) {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	}

	const numberOfProjects = props.categoryProjects.filter(
		(project) => project.title !== "Test"
	).length;

	const sliderSettings = {
		nextArrow: <CustomArrowRight />,
		prevArrow: <CustomArrowLeft />,
		dots: false,
		speed: 500,
		infinite: numberOfProjects > 1,
		slidesToShow: numberOfProjects > 4 ? 4 : numberOfProjects,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 860,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Container>
			<hr />
			<h3 className="categorygrid">{props.slickTitle}</h3>
			<div className="category-slick-container">
				<Slider {...sliderSettings} className="custom-slider w-100">
					{props.categoryProjects.map(
						(project) =>
							project.title != "Test" && (
								<div key={project.title} className="slick-item center-div">
									<div style={{ width: "250px" }} className="center-div">
										<div
											style={{
												position: "relative",
												width: "100%",
											}}
										>
											<Link
												to={`/projects/${project.owner_username.replace(
													/\s+/g,
													"-"
												)}/${project.title.replace(/\s+/g, "-")}`}
												className="w-100"
											>
												<div>
													<div style={{ position: "relative" }}>
														<img
															className="horizontal_card_image w-100"
															src={project.thumbnail}
															style={{
																objectFit: "cover",
																filter:
																	"drop-shadow(rgba(0, 0, 0, 0.25) -6px 7px 8px)",
																borderRadius: "8px",
																height: "100%",
															}}
														/>
														<p
															className="px-2 m-0 me-2"
															style={{
																backgroundColor: project.live
																	? "Red"
																	: project.raised_amount >= project.fund_amount
																	? "#5BB85C"
																	: project.raised_amount === 0
																	? "#cd77d3"
																	: "lightgrey",
																borderRadius: "8px",
																position: "absolute",
																top: "5px",
																left: "5px",
																margin: 0,
																zIndex: "1000",
																fontSize: "0.8rem",
																color: "white",
																verticalAlign: "middle",
																filter:
																	"drop-shadow(rgba(0, 0, 0, 0.25) -6px 7px 8px)",
															}}
														>
															{project.live
																? "Live"
																: project.raised_amount >= project.fund_amount
																? "Successful"
																: project.raised_amount === 0
																? "Soon"
																: "Finished"}
														</p>
													</div>
												</div>
												<div className="mt-2">
													<div>
														<p
															className="p-0 m-0"
															style={{
																display: "inline-flex",
																alignItems: "center",
																color: "black",
																fontSize: "1rem",
															}}
														>
															{project.title}
														</p>
														<p
															className="horizontal-card-description"
															style={{ color: "grey", fontSize: "0.9rem" }}
														>
															{truncateText(project.head)}
														</p>
													</div>
												</div>
											</Link>
											<Link to={`/profile/${project.owner_username}`}>
												<p
													className="horizontal-card-by m-0 p-0"
													style={{ fontSize: "0.8rem" }}
												>
													By {truncateText(project.owner_username)}
												</p>
											</Link>
											{(project.live ||
												project.raised_amount >= project.fund_amount) && (
												<Progress
													percent={Math.round(
														((Number(project.raised_amount) +
															Number(project.current_reward)) /
															Number(project.fund_amount)) *
															100
													)}
													size="small"
													status="active"
													strokeColor={
														((Number(project.raised_amount) +
															Number(project.current_reward)) /
															Number(project.fund_amount)) *
															100 >=
														100
															? "#5BB85C"
															: "#CD77D3"
													}
													showInfo={false}
												/>
											)}
										</div>
									</div>
								</div>
							)
					)}
				</Slider>
			</div>
			<br />
			<br />
		</Container>
	);
}
