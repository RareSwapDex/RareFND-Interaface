import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalDialog(props) {
	const [isShow, invokeModal] = React.useState(props.show);
	const initModal = () => {
		if (props.function_) props.function_();
		if (isShow) {
			if (props.closeFunction) {
				props.closeFunction();
			}
		}
		return invokeModal(!isShow);
	};
	return (
		<>
			{props.button && <div onClick={initModal}>{props.button}</div>}
			<Modal show={isShow}>
				<Modal.Header closeButton onClick={initModal}>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ whiteSpace: "pre-wrap" }}>
					{props.description}
				</Modal.Body>
				<Modal.Footer>
					<Button
						onMouseDown={(e) => e.preventDefault()}
						size="md"
						style={{
							background:
								"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
							border: "none",
							color: "white",
							borderRadius: "0px",
						}}
						onClick={initModal}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default ModalDialog;
