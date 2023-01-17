import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./index.css";
import chart from "../../assets/carousel/chart.svg";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthContext";

export default function HomeCarousel() {
	const { user } = useContext(AuthContext);
	return (
		<div className="parent_home_caroussel">
			<Carousel fade controls={false} indicators={false}>
				<div
					style={{
						height: "80vh",
						minHeight: "600px",
					}}
				>
					<div
						className="w-100 h-100"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div>
							<h1 style={{ fontWeight: "900", textAlign: "center" }}>
								Rare Find Then Fund
							</h1>
							<br />
							<br />
							<div>
								<p
									className="mx-auto"
									style={{
										color: "#3d3d3d",
										lineHeight: "1.8",
										fontSize: "1.125rem",
										maxWidth: "900px",
										textAlign: "center",
									}}
								>
									The only crowdfunding platform that pays YOU to start your
									fundraising journey! For a limited time only kickstart your
									campaign with 10% completely free to help you reach your
									target!
								</p>
							</div>
							<br />
							<br />
							<div className="text-center">
								{!user ? (
									<>
										<Link to="/signup">
											<Button
												variant="warning"
												className="rise-button"
												size="lg"
												onMouseDown={(e) => e.preventDefault()}
												style={{
													fontFamily: "'Poppins', sans-serif",
													color: "#1b1b1b",
													height: "3.7rem",
													fontSize: "1.4rem",
													minHeight: "3rem",
													padding: "0.5rem 2rem",
													borderRadius: "0.75rem",
												}}
											>
												<strong>Sign up</strong> - it's Free
												<Image
													className="chart_image"
													src={chart}
													style={{
														position: "absolute",
														top: "-100%",
														left: "-80%",
														width: "180px",
														height: "180px",
													}}
												/>
											</Button>
										</Link>
										<br />
										<p style={{ color: "#3d3d3d" }}>
											Or,{" "}
											<Link
												to="/dashboard/projects"
												style={{
													lineHeight: "3",
													textDecoration: "underline",
													color: "#3d3d3d",
												}}
											>
												Start a project!
											</Link>
										</p>
									</>
								) : (
									<Link to="/dashboard/projects">
										<Button
											variant="warning"
											className="rise-button"
											size="lg"
											to="/dashboard/projects"
											onMouseDown={(e) => e.preventDefault()}
											style={{
												fontFamily: "'Poppins', sans-serif",
												color: "#1b1b1b",
												height: "3.7rem",
												fontSize: "1.4rem",
												minHeight: "3rem",
												padding: "0.5rem 2rem",
												borderRadius: "0.75rem",
											}}
										>
											<strong>Start Project</strong> - it's Free
											<Image
												className="chart_image"
												src={chart}
												style={{
													position: "absolute",
													top: "-100%",
													left: "-80%",
													width: "180px",
													height: "180px",
												}}
											/>
										</Button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</Carousel>
		</div>
	);
}
