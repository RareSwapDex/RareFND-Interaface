import { Tabs } from "antd";
import { Row, Col } from "react-bootstrap";
import Card_ from "./card.js";
import React, { Component } from "react";
import Slider from "react-slick";
import metapolis from "../../assets/logos/metapolis.jpeg";
import safemoon from "../../assets/logos/safemoon.jpeg";
import hacken from "../../assets/logos/Hacken.jpeg";
import bsc from "../../assets/logos/bsc.svg";
import FCFPay from "../../assets/logos/FCFPay.png";
import Embr from "../../assets/logos/Embr.png";

export default function Partners() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: false,
					dots: false,
				},
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
					dots: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
				},
			},
		],
	};
	return (
		<div style={{ width: "100%" }}>
			<Row style={{ paddingLeft: "10%", width: "100%" }}>
				<div
					className="mt-5"
					style={{
						border: " 2px solid #cd77d3",
						width: "10%",
						minWidth: "60px",
						marginBottom: "20px",
					}}
				></div>
			</Row>

			<div
				style={{
					width: "70%",
				}}
				className="mx-auto"
				id="crypto-partners"
			>
				<div>
					<div className="mb-5">
						<h1 className="text-center">Our Crypto Industry Partners</h1>
					</div>
					<Slider {...settings}>
						<div>
							<Card_
								image={metapolis}
								title="Metapolis"
								description="www.metapolis.studio"
							/>
						</div>
						<div>
							<Card_
								image={hacken}
								title="Hacken"
								description="www.hacken.io"
							/>
						</div>
						<div>
							<Card_ image={bsc} title="BSC" description="www.binance.com" />
						</div>
						<div>
							<Card_
								image={FCFPay}
								title="FCFPay"
								description="www.fcfpay.com"
							/>
						</div>
						<div>
							<Card_ image={Embr} title="Embr" description="www.joinembr.com" />
						</div>
						<div>
							<Card_
								image={safemoon}
								title="Safemoon"
								description="swap.safemoon.com/"
							/>
						</div>
					</Slider>
				</div>
			</div>
		</div>
	);
}
