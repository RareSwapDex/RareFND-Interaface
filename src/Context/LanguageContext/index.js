import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export default LanguageContext;

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState({});
	const { t, i18n } = useTranslation();

	useEffect(() => {
		if (navigator.language.startsWith("ar")) setLanguage("arabic");
	}, []);

	useEffect(() => {
		if (language === "arabic") {
			i18n.changeLanguage("ar");
		} else {
			i18n.changeLanguage("en");
		}
	}, [language]);

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
