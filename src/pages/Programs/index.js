import CategoryCarousel from "../../components/CategoryCarousel";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import "./index.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function About() {
	const [rareFndData, setRareFndData] = useState({});
	const { t } = useTranslation();
	const location = useLocation();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/rarefnd/data/")
			.then((response) => {
				setRareFndData(response.data);
			});
	}, []);

	return (
		<div>
			<CategoryCarousel image={AboutUs} title={t("aboutUs.aboutUs")} />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						padding: "5vw",
						marginTop: "30px",
						marginBottom: "30px",
						width: "90%",
					}}
				>
					<h2>{t("aboutUs.ourTeam")}</h2>
					<p>{t("aboutUs.ourTeamParagraph")}</p>
					<h2>{t("aboutUs.ourCommunity")}</h2>
					<p>{t("aboutUs.ourCommunityParagraph")}</p>
					<br />
					<br />
					<h2>{t("aboutUs.whitepaper")}</h2>
					{t("aboutUs.whitepaperParagraph")}{" "}
					<a href={rareFndData.white_paper} target="_blank" rel="noreferrer">
						{t("aboutUs.here")}
					</a>
					.
				</div>
			</div>
		</div>
	);
}
