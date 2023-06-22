import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};

function LoadingSpinner(props) {
	let [loading, setLoading] = useState(true);

	return (
		<div
			className="sweet-loading"
			style={{
				width: "100%",
				height: "100",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<BeatLoader
				loading={loading}
				cssOverride={override}
				size={100}
				color={props.color || "#ffffff"}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default LoadingSpinner;
