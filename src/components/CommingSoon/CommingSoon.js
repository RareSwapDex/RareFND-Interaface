import React from "react";
import commingSoonImage from "../../assets/comingSoon.png";
import "./index.css";

const CommingSoon = () => {
	return (
		<div className="mainDiv">
			<div className="row mainRow">
				<div className="col-12 col-md-6 textCol">
					<div>
						<h3>This page is Coming Soon</h3>
					</div>
				</div>
				<div className="col-12 col-md-6 imageCol">
					<img src={commingSoonImage} />
				</div>
			</div>
		</div>
	);
};

export default CommingSoon;
