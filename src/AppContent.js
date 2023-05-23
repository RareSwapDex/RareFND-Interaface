import React, { useContext, useEffect } from "react";
import LanguageContext from "./Context/LanguageContext";
import NavBar from "./components/Navbar";
import Main from "./Main.js";
import Footer from "./components/Footer/Footer";
import FloatingButton from "./components/FloatingButton";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function AppContent({ provider, setProvider }) {
	const { language } = useContext(LanguageContext);
	const direction = language === "arabic" ? "rtl" : "ltr";
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		const ltrStylesheet = "/english.css";
		const rtlStylesheet = "/arabic.css";

		const linkId = "language-styles";
		const existingLink = document.getElementById(linkId);

		if (existingLink) {
			existingLink.remove();
		}

		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.id = linkId;
		link.href = direction === "rtl" ? rtlStylesheet : ltrStylesheet;

		document.head.appendChild(link);

		return () => {
			if (existingLink) {
				existingLink.remove();
			}
		};
	}, [direction]);

	return (
		<div className="App" dir={direction}>
			{/* ... */}
			<NavBar />
			<Main />
			<Footer />
			<FloatingButton
				value={
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<AiOutlinePlus
							className="me-2"
							style={{
								fontSize: "1.2rem",
								fontWeight: "bold",
							}}
						/>
						<p style={{ margin: 0 }}>
							{t("floatingButtons.startProject.title")}
						</p>
					</div>
				}
				onClick={() => navigate("/dashboard/new-project")}
			/>
		</div>
	);
}

export default AppContent;
