import React from "react";
import { Button } from "antd";
import "./index.css";

const FloatingButton = (props) => {
	return (
		<Button
			className="floating-button primaryButton-all-radius"
			onClick={props.onClick}
		>
			{props.value}
		</Button>
	);
};

export default FloatingButton;
