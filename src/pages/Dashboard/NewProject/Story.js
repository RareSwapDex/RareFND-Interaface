import { Row } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Button from "react-bootstrap/Button";
import useAxios from "../../../utils/useAxios/useAxios";

export default function Story(props) {
	let api = useAxios({
		headers: {
			"content-type": "multipart/form-data",
		},
	});
	const handleChange = (event, editor) => {
		const data = editor.getData();
		console.log("Editor data: ", data); // Add this line to log the editor data.
		props.updateProjectData(
			{ target: { name: "projectStory", value: data } },
			"story"
		);
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
		<div className="DashboardCreateProjectStory">
			<DashboardCreateProjectItemHead
				title="Introduce your project"
				head="Tell people why they should be excited about your project. Get specific but be clear and be brief."
			/>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<h4>
					Project description<span className="required-asterisk">*</span>
				</h4>
				<p style={{ marginBottom: "40px" }}>
					Describe what you're raising funds to do, why you care about it, how
					you plan to make it happen, and who you are. Your description should
					tell contributors everything they need to know. If possible, include
					images to show them what your project is all about and what rewards
					look like.
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
						data={
							props.projectData &&
							props.projectData["story"] &&
							props.projectData["story"].projectStory
						}
						onReady={(editor) => {
							console.log("Editor ready");
						}}
						onChange={(event, editor) => handleChange(event, editor)}
						onBlur={(event, editor) => {}}
						onFocus={(event, editor) => {}}
					/>
					<p className="invalid-input-p">
						{props.formErrors && props.formErrors.projectStory}
					</p>
				</div>
			</Row>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div style={{ textAlign: "left" }}>
						<Button
							onMouseDown={(e) => e.preventDefault()}
							size="md"
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
