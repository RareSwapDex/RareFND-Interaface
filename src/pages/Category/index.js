import CategoryGridCard from "../../components/CategoryGridCard";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CategoryCarousel from "../../components/CategoryCarousel";
import { Spin } from "antd";
import LanguageContext from "../../Context/LanguageContext";

export default function Category() {
	const { language } = useContext(LanguageContext);
	const [categoryData, setCategoryData] = useState({});
	const [categoryProjects, setCategoryProjects] = useState(null);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const [categoryName, setCategoryName] = useState(
		window.location.pathname
			.split("/")
			.at(-1)
			.replace(new RegExp("-", "g"), " ")
	);
	useEffect(() => {
		setCategoryName(
			window.location.pathname
				.split("/")
				.at(-1)
				.replace(new RegExp("-", "g"), " ")
		);
	}, [location.pathname]);
	useEffect(() => {
		setLoading(true);
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/category/")
			.then((response) => {
				const data = response.data.categories;
				for (let i = 0; i < data.length; i++) {
					if (data[i].name.toLowerCase() === categoryName.toLowerCase()) {
						console.log(language === "arabic", data[i].arabic_name);
						setCategoryData({
							title: data[i].name,
							arabicTitle: data[i].arabic_name,
							subheader: data[i].subheader,
							arabicSubheader: data[i].arabic_subheader,
							image: data[i].image,
						});
						break;
					}
				}
			})
			.then(() => {
				axios
					.get(
						process.env.REACT_APP_BASE_URL +
							`/api/project/category/${categoryName}/`
					)
					.then((response) => {
						setCategoryProjects(response.data.projects);
						console.log("response.data.projects", response.data.projects);
						setLoading(false);
					});
			});
	}, [categoryName]);
	return loading ? (
		<div style={{ height: "100vh", width: "100%" }} className="center-div">
			<Spin spinning={loading}></Spin>
		</div>
	) : (
		<div>
			<CategoryCarousel
				image={categoryData.image}
				title={
					language === "arabic" ? categoryData.arabicTitle : categoryData.title
				}
			/>
			{categoryProjects && (
				<CategoryGridCard
					categoryProjects={categoryProjects}
					title={
						language === "arabic"
							? categoryData.arabicTitle
							: categoryData.title
					}
					subheader={
						language === "arabic"
							? categoryData.arabicSubheader
							: categoryData.subheader
					}
				/>
			)}
		</div>
	);
}
