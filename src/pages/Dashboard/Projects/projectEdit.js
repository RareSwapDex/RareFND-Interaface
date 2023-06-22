import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useEffect, useContext } from "react";
import useAxios from "../../../utils/useAxios/useAxios";
import { Row, Col } from "react-bootstrap";
import UploadButton from "../../../components/UploadButton";
import axios from "axios";
import { useParams } from "react-router";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Button from "react-bootstrap/Button";
import { notification, message } from "antd";
import SideBar from "../../../components/DashboardSideBare";

export default function EditProject() {
	const [projectData, setProjectData] = useState(null);
	const [messageApi, contextHolder] = message.useMessage();
	const [thumbnail, setThumbnail] = useState(null);

	let { projectTitle } = useParams();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/projects/${projectTitle}/`)
			.then((response) => {
				const data = response.data;
				setProjectData({
					projectHead: data.head,
					projectImageFile: data.thumbnail,
					projectStory: data.description,
					walletAddress: data.wallet_address,
				});
				setThumbnail(data.thumbnail);
			});
	}, []);

	let api = useAxios({
		headers: {
			"content-type": "multipart/form-data",
		},
	});
	const handleSave = () => {
		const saveButton = document.getElementById("save-btn");
		saveButton.disabled = true;
		messageApi.open({
			type: "loading",
			content: "Please wait",
			duration: 0,
		});

		try {
			api
				.put(`/api/project/${projectTitle}/`, projectData)
				.then((response) => {
					messageApi.destroy(); // close loading message
					if (response.status === 200) {
						notification.success({
							message: "Saved successfully",
						});
					} else {
						notification.error({
							message: "Couldn't save your changes",
						});
					}
					saveButton.disabled = false;
				})
				.catch(() => {
					// handle network errors
					saveButton.disabled = false;
					messageApi.destroy(); // close loading message
					notification.error({
						message: "Couldn't save your changes",
					});
				});
		} catch {
			saveButton.disabled = false;
			notification.error({
				message: "Couldn't save your changes",
			});
		}
	};
	const handleCKEditorChange = (event, editor) => {
		const data = editor.getData();
		console.log(projectData);
		setProjectData({ ...projectData, projectStory: data });
	};
	const updateProjectData = (event, source) => {
		let { name, value } = event.target;
		setProjectData({
			...projectData,
			[name]: value,
		});
	};

	function uploadAdapter(loader) {
		return {
			upload: () => {
				return new Promise((resolve, reject) => {
					loader.file.then((file) => {
						api
							.post("/api/project/ckeditor/upload_image", {
								ckeditorFile: file,
							})
							.then((res) => {
								resolve({
									default: res.data.url,
								});
							})
							.catch((err) => {
								reject(err);
							});
					});
				});
			},
		};
	}
	function uploadPlugin(editor) {
		editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
			return uploadAdapter(loader);
		};
	}

	return (
		<div className="dashboard-projects ">
			{contextHolder}
			<SideBar />

			{!projectData ? (
				<LoadingSpinner color="#cd77d3" />
			) : (
				<div className="dashboard-projects-container">
					{thumbnail && (
						<img
							src={thumbnail}
							style={{ width: "100%", height: "250px", objectFit: "cover" }}
						/>
					)}
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
									Project brief description
								</h2>
								<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
									<p>
										<span>
											Write a clear subtitle to help people quickly understand
											your project. it will appear on your project and
											pre-launch pages.
										</span>
									</p>
									<p>
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
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								Brief Description
							</p>
							<div className="input-with-title">
								<textarea
									className="atomic-text-input w-100 h-50"
									id="projectHead"
									maxLength="135"
									name="projectHead"
									placeholder="Your project brief description"
									defaultValue={projectData && projectData.projectHead}
									onBlur={(event) => updateProjectData(event, "basics")}
								></textarea>
							</div>
						</Col>
					</Row>
					<hr />
					<Row
						style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}
					>
						<Col md={6}>
							<div className="grid-col-12 grid-col-4-lg hide block-md">
								<h2
									className="type-14 type-18-md book mb0 medium soft-black"
									aria-level="2"
								>
									Project image
								</h2>
								<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
									<p>
										<span>
											Add an image that clearly represents your project. Choose
											one that looks good at different sizes, it will appear on
											your project page, across the RareFnd website, and (when
											shared) on social channels.
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
										</p>
									</Col>
									<Col md="2">
										<UploadButton
											title="Select image"
											accepted_formats=".gif,.jpg,.jpeg,.png"
											// updateProjectData={() => updateProjectData()}
											function_2={(data) => setProjectData(data)}
											projectData={projectData}
											name="projectImageFile"
											value={
												projectData &&
												projectData.projectImageFile &&
												typeof projectData.projectImageFile === "string" &&
												projectData.projectImageFile.includes("https")
													? projectData.projectImageFile.split("/").pop()
													: projectData.projectImageFile.name
											}
											source="basics"
										/>
									</Col>
									<Col md="5">
										{/* <p className="invalid-input-p">{"hahaha"}</p> */}
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
					<hr />
					<div className="DashboardCreateProjectStory">
						<Row
							style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}
						>
							<h2>Project description</h2>
							<p style={{ marginBottom: "40px" }}>
								Describe what you're raising funds to do, why you care about it,
								how you plan to make it happen, and who you are. Your
								description should tell contributors everything they need to
								know. If possible, include images to show them what your project
								is all about and what rewards look like.
							</p>
							<div>
								<CKEditor
									editor={ClassicEditor}
									config={{
										extraPlugins: [uploadPlugin],
										// plugins: [Alignment],
										toolbar: [
											"heading",
											"|",
											"bold",
											"italic",
											"blockQuote",
											"link",
											"numberedList",
											"bulletedList",
											"imageUpload",
											"insertTable",
											"tableColumn",
											"tableRow",
											"mergeTableCells",
											"mediaEmbed",
											"|",
											"undo",
											"redo",
										],
									}}
									data={projectData && projectData.projectStory}
									onReady={(editor) => {
										console.log("Editor ready");
									}}
									onChange={(event, editor) =>
										handleCKEditorChange(event, editor)
									}
									onBlur={(event, editor) => {}}
									onFocus={(event, editor) => {}}
								/>
								{/* <p className="invalid-input-p">hahah</p> */}
							</div>
						</Row>
					</div>
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
									Wallet Address for Milestone Payments
								</h2>
								<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
									<p>
										<span>
											This represents your unique wallet where funds from
											project milestones will be deposited. Ensure that it's
											correct and fully under your control, as transactions are
											irreversible. This address signifies your commitment to a
											transparent and decentralized funding process.
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
								Wallet Address
							</p>
							<div className="input-with-title">
								<input
									className="atomic-text-input w-100"
									id="walletAddress"
									maxLength="60"
									name="walletAddress"
									placeholder="Aloe Bud: Self-care pocket companion for iOS"
									type="text"
									defaultValue={projectData && projectData.walletAddress}
									onBlur={(event) => updateProjectData(event, "basics")}
								/>
								{/* <p className="invalid-input-p">{"hahah"}</p> */}
							</div>
						</Col>
					</Row>
					<Row
						style={{
							padding: "3vw",
							margin: "0px",
						}}
					>
						<div style={{ textAlign: "right" }}>
							<Button
								onMouseDown={(e) => e.preventDefault()}
								size="md"
								id="save-btn"
								onClick={handleSave}
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
								Save
							</Button>
						</div>
					</Row>
				</div>
			)}
		</div>
	);
}
