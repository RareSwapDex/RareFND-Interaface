import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import DropDown from "../../../components/DropDown";
import UploadButton from "../../../components/UploadButton";
import Calendar from "../../../components/Calendar";
import "./project.scss";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Basics(props) {
	const [categories, setCategories] = useState([{}]);
	const [subCategories, setSubCategories] = useState([{}]);
	const [category, setCategory] = useState(null);
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/category/")
			.then((response) => {
				if (process.env.NODE_ENV === "production") {
					setCategories(
						response.data.categories.filter(
							(category) => category.name !== "Test"
						)
					);
				} else {
					setCategories(response.data.categories);
				}
			});
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/eligible_country/")
			.then((response) => {
				let eligible_countries = response.data.eligible_countries;
				eligible_countries.sort((a, b) =>
					a.nicename > b.nicename ? 1 : b.nicename > a.nicename ? -1 : 0
				);
				setCountries(eligible_countries);
			});
	}, []);

	useEffect(() => {
		if (
			props.projectData &&
			props.projectData["basics"] &&
			props.projectData["basics"].projectCategory &&
			props.projectData["basics"].projectCategory !== category &&
			document.getElementById("projectSubcategory")
		) {
			document.getElementById("projectSubcategory").textContent =
				"Choose a subcategory";
			axios
				.get(
					process.env.REACT_APP_BASE_URL +
						`/api/category/${props.projectData["basics"].projectCategory}/subcategories/`
				)
				.then((response) => {
					setSubCategories(response.data.subcategories);
					if (response.data.subcategories.length == 0) {
						if (document.getElementById("projectSubcategory"))
							document.getElementById("projectSubcategory").textContent =
								"No Subcategories";
						props.updateProjectData(
							{ target: { name: "projectSubcategory", value: null } },
							"basics"
						);
					}
				});
			setCategory(props.projectData["basics"].projectCategory);
		}
	}, [props.projectData]);

	return countries.length > 0 ? (
		<div className="DashboardCreateProjectBasics">
			<DashboardCreateProjectItemHead
				title="Start with the basics"
				head="Make it easy for people to learn about your project."
			/>
			<Row
				style={{
					padding: "3vw",
					margin: "0px",
				}}
			>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Company or Individual
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Please specify whether you're an individual or a company. This
									information helps us to better understand who our project
									creators are and can help potential contributors know more
									about who's behind the project.
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
							Individual or Company?
							<span className="required-asterisk">*</span>
						</p>
						<DropDown
							title="Choose an option"
							id="projectOwnerType"
							name="projectOwnerType"
							options={["Individual", "Company"]}
							function_={(event) => props.updateProjectData(event, "basics")}
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectOwnerType
							}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectOwnerType}
						</p>
					</div>
				</Col>
			</Row>
			<hr />
			<Row
				style={{
					padding: "3vw",
					margin: "0px",
				}}
			>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project title
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Write a clear, brief title and subtitle to help people quickly
									understand your project. Both will appear on your project and
									pre-launch pages.
								</span>
							</p>
							<p className="">
								<span>
									Potential contributors will also see them if your project
									appears on category pages, search results, or in emails we
									send to our community.
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
							Title<span className="required-asterisk">*</span>
						</p>
						<input
							className="atomic-text-input w-100"
							id="projectTitle"
							maxLength="60"
							name="projectTitle"
							placeholder="Aloe Bud: Self-care pocket companion for iOS"
							type="text"
							defaultValue={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectTitle
							}
							onBlur={(event) => props.updateProjectData(event, "basics")}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectTitle}
						</p>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Brief Description<span className="required-asterisk">*</span>
					</p>
					<div className="input-with-title">
						<textarea
							className="atomic-text-input w-100 h-50"
							id="projectHead"
							maxLength="135"
							name="projectHead"
							placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
							defaultValue={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectHead
							}
							onBlur={(event) => props.updateProjectData(event, "basics")}
						></textarea>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectHead}
						</p>
					</div>
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
							Project category
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Choose a primary category and subcategory to help contributors
									find your project.
								</span>
							</p>
							<p className="">
								<span>
									Your second subcategory will help us provide more relevant
									guidance for your project. It won’t display on your project
									page or affect how it appears in search results.
								</span>
							</p>
							<p className="">
								<span>
									You can change these anytime before and during your campaign.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title" style={{ position: "relative" }}>
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							Category<span className="required-asterisk">*</span>
						</p>
						<DropDown
							title="Choose Category"
							id="projectCategory"
							name="projectCategory"
							options={
								categories
									? categories.map((category) => {
											if (category.name != "All") return category.name;
									  })
									: []
							}
							function_={(event) => props.updateProjectData(event, "basics")}
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectCategory
							}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectCategory}
						</p>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Subcategory
					</p>
					<div className="input-with-title">
						<DropDown
							title="Choose Subcategory"
							id="projectSubcategory"
							name="projectSubcategory"
							options={
								subCategories
									? subCategories.map((subcategory) => {
											if (subcategory.name != "All") return subcategory.name;
									  })
									: []
							}
							function_={(event) => props.updateProjectData(event, "basics")}
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectSubcategory
							}
						/>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Type<span className="required-asterisk">*</span>
					</p>
					<div className="input-with-title">
						<DropDown
							title="Choose Project Type"
							id="projectType"
							name="projectType"
							options={["Startup Fundraising", "Charity"]}
							function_={(event) => props.updateProjectData(event, "basics")}
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectType
							}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectType}
						</p>
					</div>
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
							Project location
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Enter the location that best describes where your project is
									based.
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
							Address<span className="required-asterisk">*</span>
						</p>
						<input
							className="atomic-text-input w-100"
							id="projectAddress"
							maxLength="150"
							name="projectAddress"
							placeholder="DMCC Crypto Centre, 48th Floor, Almas Tower, JLT"
							type="text"
							defaultValue={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectAddress
							}
							onBlur={(event) => props.updateProjectData(event, "basics")}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectAddress}
						</p>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Country<span className="required-asterisk">*</span>
					</p>
					<div className="input-with-title">
						<DropDown
							title="Choose a country"
							id="projectCountry"
							options={countries.map((country) => country.nicename)}
							function_={(event) => props.updateProjectData(event, "basics")}
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectCountry
							}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectCountry}
						</p>
					</div>
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
							Project image
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Add an image that clearly represents your project. Choose one
									that looks good at different sizes, it will appear on your
									project page, across the RareFnd website, and (when shared) on
									social channels.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title h-100">
						<Row
							className="h-100"
							style={{
								display: "flex",
								gap: "20px",
								alignItems: "center",
							}}
						>
							<Col md="5">
								<p style={{ margin: "0px" }}>
									Upload Image (.gif,.jpg,.jpeg,.png)
									<span className="required-asterisk">*</span>
								</p>
							</Col>
							<Col md="2">
								<UploadButton
									title="Select image"
									accepted_formats=".gif,.jpg,.jpeg,.png"
									updateProjectData={props.updateProjectData}
									name="projectImageFile"
									value={
										props.projectData &&
										props.projectData["basics"] &&
										props.projectData["basics"].projectImageFile &&
										props.projectData["basics"].projectImageFile.name
									}
									source="basics"
								/>
							</Col>
							<Col md="5">
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.projectImageFile}
								</p>
							</Col>
						</Row>
					</div>
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
							Target launch date
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Select a date when you want to launch your project, if your
									project got accepted it will be live on our platform on that
									date, before that it will be on the "Coming soon" projects and
									you will get a URL to your project that you can use for
									promotion.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Launch date<span className="required-asterisk">*</span>
					</p>
					<div className="input-with-title">
						<Calendar
							updateProjectData={props.updateProjectData}
							name="projectLaunchDate"
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectLaunchDate
							}
							source="basics"
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectLaunchDate}
						</p>
					</div>
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
							Fundraising deadline
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Set a time limit for your fundraising. You will not be able to
									change this after you launch.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Deadline date<span className="required-asterisk">*</span>
					</p>
					<div className="input-with-title">
						<DropDown
							title="Choose an option"
							id="projectDeadlineDate"
							options={["30 days", "60 days", "90 days"]}
							function_={(event) => props.updateProjectData(event, "basics")}
							value={
								props.projectData &&
								props.projectData["basics"] &&
								props.projectData["basics"].projectDeadlineDate
							}
						/>
						<p className="invalid-input-p">
							{props.formErrors && props.formErrors.projectDeadlineDate}
						</p>
					</div>
				</Col>
			</Row>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<div style={{ textAlign: "right" }}>
					<Button
						// variant="warning"
						style={{
							background:
								"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
							border: "none",
							color: "white",
							borderRadius: "0px",
							width: "8vw",
							minWidth: "100px",
						}}
						onMouseDown={(e) => e.preventDefault()}
						size="md"
						onClick={props.nextTabFunction}
					>
						Next
					</Button>
				</div>
			</Row>
		</div>
	) : (
		<LoadingSpinner color="#cd77d3" />
	);
}
