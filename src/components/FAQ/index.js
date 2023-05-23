import React from "react";
import "./index.css";
import { Collapse } from "antd";

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FAQ = () => {
	const onChange = (key) => {};

	return (
		<div className="faq-section">
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h1 className="text-center mb-5" style={{ maxWidth: "90%" }}>
					Frequently Asked Questions
				</h1>
			</div>
			<Collapse
				defaultActiveKey={["1"]}
				onChange={onChange}
				style={{ borderRadius: "0.5rem" }}
			>
				<Panel header="This is panel header 1" key="1">
					<p>{text}</p>
				</Panel>
				<Panel header="This is panel header 2" key="2">
					<p>{text}</p>
				</Panel>
				<Panel header="This is panel header 3" key="3">
					<p>{text}</p>
				</Panel>
			</Collapse>
		</div>
	);
};

export default FAQ;
