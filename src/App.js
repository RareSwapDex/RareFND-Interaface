import Main from "./Main.js";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import TopBanner from "./components/TopBanner";
import { useState } from "react";
import { ProviderContext } from "./web3/ProviderContext";
import { AuthProvider } from "./Context/AuthContext/index.js";
import ScrollToTop from "./Context/ScrollToTop/index.js";

export default function App() {
	const [provider, setProvider] = useState();
	return (
		<div className="App">
			<ScrollToTop />
			<AuthProvider>
				<ProviderContext.Provider value={{ provider, setProvider }}>
					{/* <TopBanner
						text="Donate now and benefit from Give2Earn at Rare FND"
						href="https://rarefnd.zendesk.com/hc/en-gb/articles/7408695124125-Introducing-Give2Earn"
					/> */}

					<NavBar />
					<Main />
					<Footer />
				</ProviderContext.Provider>
			</AuthProvider>
		</div>
	);
}
