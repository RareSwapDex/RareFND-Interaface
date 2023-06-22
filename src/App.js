import React, { useState } from "react";
import { ProviderContext } from "./web3/ProviderContext";
import { AuthProvider } from "./Context/AuthContext/index.js";
import { DashboardSideBarProvider } from "./Context/DashboardSideBarContext/index.js";
import ScrollToTop from "./Context/ScrollToTop/index.js";
import { LanguageProvider } from "./Context/LanguageContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppContent from "./AppContent";

export default function App() {
	const [provider, setProvider] = useState();

	return (
		<LanguageProvider>
			<ScrollToTop />
			<AuthProvider>
				<ProviderContext.Provider value={{ provider, setProvider }}>
					<DashboardSideBarProvider>
						<AppContent provider={provider} setProvider={setProvider} />
					</DashboardSideBarProvider>
				</ProviderContext.Provider>
			</AuthProvider>
		</LanguageProvider>
	);
}
