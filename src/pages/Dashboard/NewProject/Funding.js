import { Row, Col, Container } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { useState, useEffect, useRef } from "react";
import UploadButton from "../../../components/UploadButton";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import Calendar from "../../../components/Calendar";

export default function Funding(props) {
	const [fundingData, setFundingData] = useState([{}]);
	let [remountKey, setRemountKey] = useState(0);
	const [percentage, setPercentage] = useState("");
	const projectDataRef = useRef(props.projectData);
	projectDataRef.current = props.projectData;

	function calculateMinDate() {
		let maxDate = null;

		// Loop through all the fundingSpend items
		for (const item in props.projectData["funding"]["fundingSpend"]) {
			const dateStr =
				props.projectData["funding"]["fundingSpend"][item].fundingSpendDate;
			const date = new Date(dateStr);

			if (!maxDate || date > maxDate) {
				maxDate = date;
			}
		}

		// If there was at least one date, add 3 days to the max date
		if (maxDate) {
			maxDate.setDate(maxDate.getDate() + 3);
		}

		// return the calculated min date
		return maxDate;
	}

	const calculateSum = () => {
		let sum = 0;
		Object.keys(props.projectData["funding"]["fundingSpend"]).forEach(
			(item) => {
				const amount =
					props.projectData["funding"]["fundingSpend"][item].fundingSpendAmount;
				sum += amount ? parseFloat(amount) : 0;
			}
		);
		return sum;
	};

	const calculatePercentage = () => {
		const sum = calculateSum();
		const totalFunds = props.projectData["funding"].projectFundsAmount;
		setPercentage(
			!totalFunds
				? "Enter funding target above"
				: ((sum / totalFunds) * 100).toFixed(2) <= 100
				? `${((sum / totalFunds) * 100).toFixed(2)}%`
				: `${((sum / totalFunds) * 100).toFixed(2)}% (ERROR)`
		); // set state variable here
	};

	const handleInputChanges = (e, rowId) => {
		let { name, value } = e.target;
		let projectData_ = { ...projectDataRef.current };
		projectData_["funding"]["fundingSpend"][rowId] = {
			...projectData_["funding"]["fundingSpend"][rowId],
			[name]: value,
		};
		props.setProjectData(projectData_);
	};

	useEffect(() => {
		calculatePercentage();
	}, [props.projectData]);

	const handleAddMilestone = () => {
		let projectData_ = { ...projectDataRef.current };

		// Find the maximum key in the fundingSpend object
		let maxKey = Math.max(
			...Object.keys(projectData_.funding.fundingSpend).map(Number)
		);

		projectData_["funding"]["fundingSpend"] = {
			...projectData_["funding"]["fundingSpend"],
			[maxKey + 1]: {},
		};

		props.setProjectData(projectData_);
	};

	const handleRemoveMilestone = (item) => {
		let projectData_ = { ...projectDataRef.current };
		let updatedFundingSpend = { ...projectData_["funding"]["fundingSpend"] };
		delete updatedFundingSpend[item];
		projectData_["funding"]["fundingSpend"] = updatedFundingSpend;
		props.setProjectData(projectData_);
		setRemountKey(remountKey + 1); // increment the key to force remount
	};

	return (
		<div className="DashboardCreateProjectFunding">
			<DashboardCreateProjectItemHead
				title="Let’s talk about money"
				head="Plan and manage your project’s finances."
			/>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Funding goal
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Set an achievable goal that covers what you need to complete
									your project.
								</span>
							</p>
							<p className="">
								<span>
									Funding is all-or-nothing. If you don’t meet your goal, you
									won’t receive any money.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title">
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							Goal amount (in US dollars)
							<span className="required-asterisk">*</span>
						</p>
						<input
							className="atomic-text-input w-100"
							id="projectFundsAmount"
							maxLength="60"
							name="projectFundsAmount"
							placeholder="$ 0.0"
							type="text"
							onBlur={(event) => props.updateProjectData(event, "funding")}
							onKeyPress={(e) => {
								if (
									(e.key === "." &&
										(e.target.value.includes(".") || e.target.value === "")) ||
									(!/^[0-9]/.test(e.key) && !/^[.]/.test(e.key))
								) {
									e.preventDefault();
								}
								!/^[0-9]/.test(e.key) &&
									!/^[.]/.test(e.key) &&
									!e.target.value.includes(".") &&
									e.preventDefault();
							}}
							pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
							defaultValue={
								props.projectData &&
								props.projectData["funding"] &&
								props.projectData["funding"].projectFundsAmount
							}
						/>
					</div>
					<p className="invalid-input-p">
						{props.formErrors && props.formErrors.projectFundsAmount}
					</p>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project budget (optional)
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Determine the various costs to bring your project to life.
								</span>
							</p>
							<p className="">
								<span>
									On a spreadsheet or a CSV file, share your project details,
									plans and expenses{" "}
								</span>
							</p>
							<p className="">
								<span>
									Funding is all-or-nothing. If you don’t meet your goal, you
									won’t receive any money.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title h-100">
						<div
							className="h-100"
							style={{
								display: "flex",
								gap: "20px",
								alignItems: "center",
							}}
						>
							<p style={{ margin: "0px" }}>Upload File (.xlsx, .csv):</p>
							<UploadButton
								title="Select File"
								accepted_formats=".xlsx, .csv"
								updateProjectData={props.updateProjectData}
								name="projectBudgetFile"
								value={
									props.projectData &&
									props.projectData["funding"] &&
									props.projectData["funding"].projectBudgetFile &&
									props.projectData["funding"].projectBudgetFile.name
								}
								source="funding"
							/>
						</div>
					</div>
				</Col>
			</Row>
			<hr />
			<div class="px-2">
				<div className="center-div">
					<h2
						className="type-14 type-18-md book mb0 medium soft-black"
						aria-level="2"
					>
						Project Schedule of Spend
						<span className="required-asterisk">*</span>
					</h2>
				</div>
				<div className="center-div">
					<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
						<p>
							<span>
								This section is where you will explain how you plan to use the
								funds raised and when{" "}
								<span style={{ color: "red" }}>
									(You need to provide at least 2 milestones)
								</span>
								.
							</span>
						</p>
					</div>
				</div>
				<div key={remountKey}>
					{Object.keys(projectDataRef.current["funding"]["fundingSpend"]).map(
						(item, i) => {
							return (
								<Row
									style={{
										padding: "0 3vw 0 3vw",
										marginLeft: "0px",
										marginRight: "0px",
										width: "100%",
									}}
									key={i}
									className="py-2"
								>
									<Col lg={8}>
										<Row>
											<Col lg="3">
												<div
													style={{
														display: "flex",
														justifyContent: "flex-start",
														alignItems: "flex-end",
														height: "100%",
													}}
												>
													<div
														style={{
															display: "flex",
															// justifyContent: "space-between",
															alignItems: "center",
															width: "100%",
														}}
													>
														<div
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "flex-end",
															}}
														>
															{
																<BiTrash
																	className="me-3"
																	style={{
																		fontSize: "1.5rem",
																		color: i + 1 > 2 ? "red" : "transparent",
																		cursor: i + 1 > 2 ? "pointer" : "default",
																	}}
																	onClick={() =>
																		i + 1 > 2 && handleRemoveMilestone(item)
																	}
																/>
															}
														</div>
														<p
															style={{
																fontSize: "1.5rem",
															}}
															className="p-0 m-0"
														>
															Milestone {i + 1}
															{
																<span
																	className="required-asterisk"
																	style={{
																		color:
																			Number(i + 1) > 2 ? "transparent" : "red",
																	}}
																>
																	*
																</span>
															}
														</p>
													</div>
												</div>
											</Col>
											<Col lg="9">
												<p
													style={{
														marginBottom: "3px",
													}}
												>
													Description
													<span className="required-asterisk">*</span>
												</p>
												<input
													className="atomic-text-input w-100"
													maxLength="60"
													name={`fundingSpendDescription`}
													placeholder="Milestone description"
													type="text"
													onBlur={(e) => handleInputChanges(e, `${item}`)}
													defaultValue={
														props.projectData &&
														props.projectData["funding"] &&
														props.projectData["funding"]["fundingSpend"][item]
															.fundingSpendDescription
													}
												/>
												<p className="invalid-input-p">
													{props.formErrors &&
														props.formErrors.funding &&
														props.formErrors.funding[item] &&
														props.formErrors.funding[item]
															.fundingSpendDescription}
												</p>
											</Col>
										</Row>
									</Col>
									<Col lg={2}>
										<p
											style={{
												marginBottom: "3px",
											}}
										>
											Amount (USD)
											<span className="required-asterisk">*</span>
										</p>
										<input
											className="atomic-text-input w-100"
											maxLength="60"
											name="fundingSpendAmount"
											placeholder="$ 0.0"
											type="text"
											onBlur={(e) => {
												handleInputChanges(e, `${item}`);
											}}
											onKeyPress={(e) => {
												if (
													(e.key === "." &&
														(e.target.value.includes(".") ||
															e.target.value === "")) ||
													(!/^[0-9]/.test(e.key) && !/^[.]/.test(e.key))
												) {
													e.preventDefault();
												}
												!/^[0-9]/.test(e.key) &&
													!/^[.]/.test(e.key) &&
													!e.target.value.includes(".") &&
													e.preventDefault();
											}}
											pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
											defaultValue={
												props.projectData &&
												props.projectData["funding"] &&
												props.projectData["funding"]["fundingSpend"][item]
													.fundingSpendAmount
											}
										/>
										<p className="invalid-input-p">
											{props.formErrors &&
												props.formErrors.funding &&
												props.formErrors.funding[item] &&
												props.formErrors.funding[item].fundingSpendAmount}
										</p>
									</Col>
									<Col lg={2}>
										<div>
											<p
												style={{
													marginBottom: "3px",
												}}
											>
												Date<span className="required-asterisk">*</span>
											</p>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<div className="input-with-title">
													<Calendar
														setProjectData={props.setProjectData}
														updateProjectData={props.updateProjectData}
														projectDataRef={projectDataRef}
														handleInputErrors={props.handleInputErrors}
														name="fundingSpendDate"
														rowId={`${item}`}
														value={
															props.projectData &&
															props.projectData["funding"] &&
															props.projectData["funding"]["fundingSpend"][item]
																.fundingSpendDate
														}
														source="funding"
														// minDate={() => calculateMinDate()}
													/>
												</div>
											</div>
											<p className="invalid-input-p">
												{props.formErrors &&
													props.formErrors.funding &&
													props.formErrors.funding[item] &&
													props.formErrors.funding[item].fundingSpendDate}
											</p>
										</div>
									</Col>
								</Row>
							);
						}
					)}
				</div>
				<div
					style={{
						padding: "0 3vw 0 3vw",
						marginLeft: "0px",
						marginRight: "0px",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						color: "#D282D2",
					}}
				>
					Milestone allocation:
					<span
						style={{
							marginLeft: "3px", // Added marginLeft
							color:
								percentage === "100.00%"
									? "green"
									: percentage.includes("Enter") || percentage.includes("ERROR")
									? "red"
									: "#D282D2",
						}}
					>
						{" "}
						{percentage}
					</span>
				</div>
				<div
					style={{
						width: "100%",
						padding: "3vw",
						marginLeft: "0px",
						marginRight: "0px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						style={{
							background:
								"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
							border: "none",
							color: "white",
							borderRadius: "0px",
						}}
						size="md"
						onMouseDown={(e) => e.preventDefault()}
						onClick={handleAddMilestone}
					>
						Add a milestone
					</Button>
				</div>
			</div>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div style={{ textAlign: "left" }}>
						<Button
							onMouseDown={(e) => e.preventDefault()}
							// size="md"
							onClick={props.previousTabFunction}
							style={{
								background:
									"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
								border: "none",
								color: "white",
								borderRadius: "0px",
								width: "8vw",
								minWidth: "100px",
							}}
						>
							Previous
						</Button>
					</div>

					<div style={{ textAlign: "right" }}>
						<Button
							onMouseDown={(e) => e.preventDefault()}
							size="md"
							onClick={props.nextTabFunction}
							style={{
								background:
									"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
								border: "none",
								color: "white",
								borderRadius: "0px",
								width: "8vw",
								minWidth: "100px",
							}}
						>
							Next
						</Button>
					</div>
				</div>
			</Row>
		</div>
	);
}
