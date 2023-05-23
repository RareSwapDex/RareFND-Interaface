import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const Card_ = (props) => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<a
			href={`https://${props.description}`}
			target="_blank"
			rel="noreferrer"
			style={{
				textDecoration: "none",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card
				hoverable
				style={{
					width: "60%",
					marginBottom: "20px",
					borderRadius: "0.5rem",
				}}
				cover={
					<img
						alt="partner"
						src={props.image}
						style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
					/>
				}
			>
				<Meta title={props.title} description={props.description} />
			</Card>
		</a>
	</div>
);

export default Card_;
