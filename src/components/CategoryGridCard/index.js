import CategoryVerticalCard from "./CategoryVerticalCard";
import CategoryHorizontalCard from "./CategoryHorizontalCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";
import { Container } from "react-bootstrap";
import CategorySlick from "./CategorySlick";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../Context/LanguageContext";
import { useContext } from "react";

export default function CategoryGridCard(props) {
	const categoryProjects = props.categoryProjects;
	const { language } = useContext(LanguageContext);
	const { t } = useTranslation();

	return (
		<div>
			<div>
				<Container className="py-5">
					<h1 className="text-center" style={{ fontWeight: "bold" }}>
						{props.title}
					</h1>
					<div className="center-div">
						<p className="description text-center">{props.subheader}</p>
					</div>
				</Container>
			</div>
			{categoryProjects &&
				categoryProjects.featured_projects &&
				categoryProjects.featured_projects.length > 0 && (
					<div>
						<Container>
							<Row>
								<Col
									md={6}
									className="featured-project-container"
									style={
										language === "arabic"
											? {
													borderLeft: "0.5px solid lightgray",
											  }
											: {
													borderRight: "0.5px solid lightgray",
											  }
									}
								>
									<Container>
										<h3 className="categorygrid">
											{t("category.featured_projects")}
										</h3>
										<div>
											<CategoryVerticalCard
												project={categoryProjects.featured_projects[0]}
												owner_username={
													categoryProjects.featured_projects[0].owner_username
												}
												title={categoryProjects.featured_projects[0].title}
												description={categoryProjects.featured_projects[0].head}
												src={categoryProjects.featured_projects[0].thumbnail}
												project_id={categoryProjects.featured_projects[0].id}
												project_live={
													categoryProjects.featured_projects[0].live
												}
												project_raised_amount={
													categoryProjects.featured_projects[0].raised_amount +
													categoryProjects.featured_projects[0].current_reward
												}
												project_goal_amount={
													categoryProjects.featured_projects[0].fund_amount
												}
											/>
										</div>
									</Container>
								</Col>
								<Col md={6}>
									<Container>
										<h3 className="categorygrid">{t("category.recommend")}</h3>
										{categoryProjects.recommended_projects.map((_, idx) => (
											<div key={idx} className="my-3">
												<CategoryHorizontalCard
													project={_}
													owner_username={_.owner_username}
													title={_.title}
													src={_.thumbnail}
													project_id={_.id}
													project_live={_.live}
													project_raised_amount={
														_.raised_amount + _.current_reward
													}
													project_goal_amount={_.fund_amount}
													description={
														categoryProjects.featured_projects[0].head
													}
												/>
											</div>
										))}
									</Container>
								</Col>
							</Row>
						</Container>
						<br />
						<br />
					</div>
				)}

			{categoryProjects &&
				categoryProjects.top_5_newest_projects &&
				categoryProjects.top_5_newest_projects.length > 0 && (
					<CategorySlick
						slickTitle={t("category.taking_off")}
						categoryProjects={categoryProjects.top_5_newest_projects}
					/>
				)}
			{categoryProjects &&
				categoryProjects.home_stretch_projects &&
				categoryProjects.home_stretch_projects.length > 0 && (
					<CategorySlick
						slickTitle={t("category.home_stretch")}
						categoryProjects={categoryProjects.home_stretch_projects}
					/>
				)}
			{categoryProjects &&
				categoryProjects.all_projects &&
				categoryProjects.all_projects.length > 0 && (
					<CategorySlick
						slickTitle={t("category.all")}
						categoryProjects={categoryProjects.all_projects}
					/>
				)}
			<Container>
				<hr />
			</Container>
		</div>
	);
}
