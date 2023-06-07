import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import MainCard from "./Card.js";
import Container from "react-bootstrap/Container";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import star from "../../assets/carousel/star.png";
import partnerShip from "../../assets/carousel/Partnership-amico.png";
import Button from "react-bootstrap/Button";
import CroudFunding from "../../assets/carousel/Investment data-amico.png";
import "./index.css";
function HomeCards() {
	return (
		<Container className="pt-5 pb-5 ">
			<AnimationOnScroll animateIn="animate__bounceInRight">
				<Row>
					<Col lg={12} className="mt-4">
						<MainCard
							image={partnerShip}
							title="Key Partnerships"
							text="Key partnerships to be announced with some of the leading names in the industry across the charity space.
            Stay tuned to our socials as some of the biggest partnerships in the crowdfunding space are to be announced, and you have the chance to get involved too!"
							buttonHref="/about-us"
							buttonText="Learn more"
							imageLeft={false}
							horizontal={true}
							backgroundColor="transparent"
							textStyle={{
								color: "#3d3d3d",
								lineHeight: "1.8",
								fontSize: "1.125rem",
								fontWeight: "400",
							}}
						/>
					</Col>
				</Row>
			</AnimationOnScroll>
			<hr className="text-light" />
			<AnimationOnScroll animateIn="animate__bounceInLeft">
				<Row>
					<Col lg={12} className="mt-4">
						<MainCard
							image={CroudFunding}
							title="The Only Crowdfunding Platform That Pays You To Crowdfund"
							text="Start crowdfunding with Rare Fnd today and we will give you 10% towards your crowdfunding target!
            Not only that but reach your target quicker with 240% APY on all contributions."
							buttonHref="/about-us"
							buttonText="Learn more"
							imageLeft={true}
							horizontal={true}
							backgroundColor="transparent"
							textStyle={{
								color: "#3d3d3d",
								lineHeight: "1.8",
								fontSize: "1.125rem",
								fontWeight: "400",
							}}
						/>
					</Col>
				</Row>
			</AnimationOnScroll>
			<br />
			<br />
			<hr className="text-light" />
			<br />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						title="Fundraising solution"
						text="Crowdfunding with the speed and flexibility of crypto! We’re the first and only
            platform to offer a cryptocurrency based fundraising program. Contribution
            rewards can be delivered in minutes, not months using our revolutionary NFT
            fractionalization and steganography technology – a first in the cryptocurrency
            and crowdfunding space. Some of your campaign contributors not crypto – savvy?
            No problem! We offer fiat based payments as well using credit and debit cards.
            We’re a true end to end crowdfunding solution!"
						buttonHref="/dashboard/new-project"
						buttonText="Start fundraising"
						backgroundColor="transparent"
						textStyle={{
							position: "realtive",
							textAlign: "center",
							width: "100%",
							maxWidth: "600px",
							color: "#3d3d3d",
							lineHeight: "1.8",
							fontSize: "1.125rem",
							fontWeight: "400",
						}}
					/>
				</Col>
			</Row>
			<br />
			<hr className="text-light" />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						title="The Most Innovative Crowfunding Platform            "
						text="Not only does Rare Fnd help charities and startups reach their full potential quicker, but we also ensure that all donators and contributors are rewarded even in the unlikely event that the crowdfunding campaign was unsuccessful.            "
						textStyle={{
							width: "100%",
							maxWidth: "600px",
							color: "#3d3d3d",
							lineHeight: "1.8",
							fontSize: "1.125rem",
							fontWeight: "400",
						}}
						backgroundColor="transparent"
					/>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col lg={4} className="mt-4">
					<AnimationOnScroll animateIn="animate__bounceIn" duration={0.5}>
						<MainCard
							image={star}
							title="Free And More"
							text="Crowdfunding with the speed and flexibility of our exciting technology! Contribution rewards can be delivered in minutes, not months using our revolutionary fractionalization and steganography technology – a first in the crowdfunding space. We offer a simply and quick payment methods for reward based campaigns using fiat based payments as well using credit and debit cards. We’re a true end to end crowdfunding solution!"
							horizontal={false}
							multi_cards={true}
							backgroundColor="transparent"
							textStyle={{
								color: "#3d3d3d",
								lineHeight: "1.8",
								fontSize: "1.125rem",
							}}
						/>
					</AnimationOnScroll>
				</Col>
				<Col lg={4} className="mt-4">
					<AnimationOnScroll animateIn="animate__bounceIn" duration={0.5}>
						<MainCard
							image={star}
							title="Incentives"
							text="Your incentives for contribution tiers are embedded in an NFT which can be bought, sold, traded or used. From event tickets to gift cards – It’s easy to deliver. No complications or expense of shipping items which allow you to better fund your project and opens up the usefulness of the reward to a worldwide audience"
							horizontal={false}
							multi_cards={true}
							backgroundColor="transparent"
							textStyle={{
								color: "#3d3d3d",
								lineHeight: "1.8",
								fontSize: "1.125rem",
							}}
						/>
					</AnimationOnScroll>
				</Col>
				<Col lg={4} className="mt-4">
					<AnimationOnScroll animateIn="animate__bounceIn" duration={0.5}>
						<MainCard
							image={star}
							title="Safe For Investors"
							text="All of the contributions by investors in your campaign are autostaked in our platform. This provides the ultimate in safety for the contributors due to the fact that if a campaign fails to reach its fundraising goal, the funds are returned to the contributor PLUS any staking rewards that were earned during the campaign!"
							horizontal={false}
							multi_cards={true}
							backgroundColor="transparent"
							textStyle={{
								color: "#3d3d3d",
								lineHeight: "1.8",
								fontSize: "1.125rem",
							}}
						/>
					</AnimationOnScroll>
				</Col>
			</Row>
			<br />

			<Row style={{ height: "200px" }} className="mt-4">
				<div
					className="d-flex gap-2 mx-auto"
					style={{ height: "100%", width: "100%" }}
				>
					<Button
						href="https://t.me/RareFnd"
						variant="warning"
						size="lg"
						className="rise-button"
						target="_blank"
						rel="noreferrer"
						style={{
							width: "50%",
							fontSize: "3vw",
							fontWeight: "bold",
							textAlign: "center",
							whiteSpace: "nowrap",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "space-around",
						}}
					>
						Work better, together
					</Button>

					<Button
						href="https://t.me/RareFnd"
						target="_blank"
						rel="noreferrer"
						variant="light"
						size="lg"
						className="rise-button"
						style={{
							width: "50%",
							fontSize: "3vw",
							fontWeight: "bold",
							textAlign: "center",
							display: "inline-flex",
							alignItems: "center",
							whiteSpace: "nowrap",
							justifyContent: "space-around",
						}}
					>
						Hire a Rare Fnd Expert
					</Button>
				</div>
			</Row>

			<br />
			<hr className="text-light" />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						title="Our mission: Empower the innovator in all of us"
						text="We want to ensure that the innovators amongst all of us are given the best opportunity to make their ideas a success"
						buttonHref="/dashboard/new-project"
						buttonText="Start fundraising"
						backgroundColor="transparent"
						textStyle={{
							width: "100%",
							maxWidth: "600px",
							color: "#3d3d3d",
							lineHeight: "1.8",
							fontSize: "1.125rem",
							fontWeight: "400",
						}}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default HomeCards;
