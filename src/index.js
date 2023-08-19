import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import LazyLoad from "react-lazy-load";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Disable console.log() in production
if (process.env.NODE_ENV === "production") {
	console.log = function () {};
}
root.render(
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: "#cd77d3",
			},
		}}
	>
		{/* <React.StrictMode> */}
		<Router>
			<ConfigProvider>
				<LazyLoad height={200} once>
					<App />
				</LazyLoad>
			</ConfigProvider>
		</Router>
		{/* </React.StrictMode> */}
	</ConfigProvider>
);
reportWebVitals();
