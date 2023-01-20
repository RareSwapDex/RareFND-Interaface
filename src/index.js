import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/antd.variable.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
ConfigProvider.config({ theme: { primaryColor: "#cd77d3" } });
root.render(
	<React.StrictMode>
		<Router>
			<ConfigProvider>
				<App />
			</ConfigProvider>
		</Router>
	</React.StrictMode>
);
reportWebVitals();
