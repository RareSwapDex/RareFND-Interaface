import CategoryCarousel from "../../components/CategoryCarousel";
import Charity from "../../assets/carousel/charity.jpg";
import Startup from "../../assets/carousel/startup.jpg";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function About() {
	const [rareFndData, setRareFndData] = useState({});
	const location = useLocation();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/rarefnd/data/")
			.then((response) => {
				setRareFndData(response.data);
			});
	}, []);

	// useEffect(() => {
	// 	if (location.hash) setTabIndex(parseInt(location.hash.replace("#", "")));
	// }, [location.hash]);

	// const handleChange = (event, newTabInex) => {
	// 	setTabIndex(newTabInex);
	// };

	return (
		<div>
			<CategoryCarousel image={AboutUs} title="About Us" />
			{/* <div
				className="mt-5"
				style={{
					border: " 2px solid #cd77d3",
					width: "10%",
					minWidth: "60px",
					marginLeft: "5%",
				}}
			></div> */}
			{/* <h1
				className="mt-4"
				style={{
					color: "#3d3d3d",
					fontWeight: "bold",
					marginLeft: "5%",
				}}
			>
				Our Initiatives
			</h1> */}
			{/* <Box>
				<Box className="w-100">
					<Tabs
						value={tabIndex}
						onChange={handleChange}
						className="m-2"
						TabIndicatorProps={{ style: { background: "#cd77d3" } }}
						aria-label="secondary tabs example"
						centered
					>
						<Tab
							style={{
								maxWidth: "300px",
								width: "50%",
								color: "#3d3d3d",
								fontSize: "18px",
							}}
							label="Our team"
						/>
						<Tab
							style={{
								maxWidth: "300px",
								width: "50%",
								color: "#3d3d3d",
								fontSize: "18px",
							}}
							label="Our community"
						/>
					</Tabs>
				</Box>
				<Box sx={{ padding: "3vw" }}>
					{
						<Box className="h-100">
							<Typography>
								<div
									style={{ color: "white", height: "100%" }}
									className="programText bg-white text-black mx-auto"
								>
									<div>
										<img
											style={{
												height: `56${
													window.innerHeight > window.innerWidth ? "vw" : "vh"
												}`,
												width: "100%",
												objectFit: "cover",
											}}
											src={tabIndex === 0 ? Charity : Startup}
											id={tabIndex.toString()}
											className="img-fluid shadow-4"
											alt="..."
										/>
									</div>

									<div style={{ padding: "5vw" }}>
										{tabIndex === 0 ? (
											<>
												<p>
													The Rare FND organization is a non-profit organization
													made up of rare individuals who are experts in their
													field that when combined form a rare force to help
													support the ecosystem of all involved with Rare FND.
												</p>
												<p>
													With governmental advisors to philanthropists to
													industry experts across a range of sectors we aim to
													provide the support needed to build the best possible
													community for all campaigns on our platform to give
													exposure to that Rare Find and ensure that they can
													complete their Rare Fund.
												</p>
											</>
										) : (
											<>
												<p>
													Through the utilization of our huge community, you get
													an extension to your own marketing campaigns. With
													Rare FND partnerships with influencers across all
													social media platforms your crowdfunding campaign gets
													exposure through each and every one of our influencer
													partnerships meaning that you reach millions of users
													just by using by platform.
												</p>
												<p>
													Not only that but we have our own strong community in
													our own social media platforms who can also support
													your crowdfunding campaign through a range of
													different engagements.
												</p>
												<p>
													Our community members can also help your campaign even
													more! Through holding our native community token
													members can vote on their favourite crowdfunding
													charities or start-ups they would like to receive
													extra exposure.
												</p>
												<p>
													Your crowdfunding campaign starts with our community
													as well as your own, so as your campaign grows within
													our community then so does your own.
												</p>
												<h5>Whitepaper:</h5>
												<p>
													Download our technical documentation relating to the
													Rare FND native token here.
												</p>
											</>
										)}

										<div className="col-md-12 text-center">
											<Button
												type="button"
												// className="btn-warning"
												size="lg"
												to="/dashboard/projects"
											>
												Start Project {""}
											</Button>
										</div>
									</div>
								</div>
							</Typography>
						</Box>
					}
				</Box>
			</Box> */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						padding: "5vw",
						marginTop: "30px",
						marginBottom: "30px",
						width: "90%",
					}}
				>
					<h2>Our team</h2>
					<p>
						The Rare FND organization is a non-profit organization made up of
						rare individuals who are experts in their field that when combined
						form a rare force to help support the ecosystem of all involved with
						Rare FND. With governmental advisors to philanthropists to industry
						experts across a range of sectors we aim to provide the support
						needed to build the best possible community for all campaigns on our
						platform to give exposure to that Rare Find and ensure that they can
						complete their Rare Fund.
					</p>
					<h2>Our community</h2>
					<p>
						Through the utilization of our huge community, you get an extension
						to your own marketing campaigns. With Rare FND partnerships with
						influencers across all social media platforms your crowdfunding
						campaign gets exposure through each and every one of our influencer
						partnerships meaning that you reach millions of users just by using
						by platform. Not only that but we have our own strong community in
						our own social media platforms who can also support your
						crowdfunding campaign through a range of different engagements. Our
						community members can also help your campaign even more! Through
						holding our native community token members can vote on their
						favourite crowdfunding charities or start-ups they would like to
						receive extra exposure. Your crowdfunding campaign starts with our
						community as well as your own, so as your campaign grows within our
						community then so does your own.
						<br />
						<br />
						<h2>Whitepaper</h2>
						<br />
						Download our technical documentation relating to the Rare FND native
						token{" "}
						<a href={rareFndData.white_paper} target="_blank" rel="noreferrer">
							here
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
