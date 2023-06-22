import React, { useRef, useEffect, useState } from "react";
import useFileUpload from "react-use-file-upload";

const UploadButton = (props) => {
	const { handleDragDropEvent, setFiles } = useFileUpload();
	const [file, setFile] = useState();

	useEffect(() => {
		if (props.updateProjectData)
			file &&
				props.updateProjectData(
					{ target: { name: props.name, value: file } },
					props.source
				);
		else if (file && props.function_) {
			props.function_(
				{ target: { name: props.name, value: file } },
				props.rowId
			);
		} else if (file && props.function_2) {
			console.log("lplplplpl", props.name, file);
			props.function_2({
				...props.projectData,
				[props.name]: file,
			});
		}
	}, [file]);

	const inputRef = useRef();

	let fileName = props.value
		? props.value
		: props.valueFunction
		? props.valueFunction(props.name, props.rowId)
		: "";

	if (fileName && fileName.length > 10)
		fileName = fileName.slice(0, 10) + "...";

	return (
		<div css={{}}>
			<div className="form-container">
				{/* Provide a drop zone and an alternative button inside it to upload files. */}
				<div
					css={{}}
					onDragEnter={handleDragDropEvent}
					onDragOver={handleDragDropEvent}
					onDrop={(e) => {
						handleDragDropEvent(e);
						setFiles(e, "a");
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<button
							onClick={() => inputRef.current.click()}
							style={{
								backgroundColor: "transparent",
								border: "1.5px solid #cd77d3",
							}}
						>
							{props.title}
						</button>

						{/* Hide the crappy looking default HTML input */}
						<input
							ref={inputRef}
							type="file"
							style={{ display: "none" }}
							accept={props.accepted_formats}
							onChange={(e) => {
								e.preventDefault();
								setFile(e.target.files[0]);
								setFiles(e, "a");
								inputRef.current.value = null;
							}}
						/>
						<p style={{ margin: "0px", padding: "0 0 0 10px" }}>{fileName}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadButton;
