import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

export default function CategoryCarousel(props) {
	return (
		<div className="category-carousel">
			<img
				className="d-block w-100 category-image"
				src={props.image}
				alt="Third slide"
				style={{
					height: `50${window.innerHeight > window.innerWidth ? "vw" : "vh"}`,
					objectFit: "cover",
					filter: "blur(3px)",
					webkitFilter: "blur(3px)",
				}}
			/>
			<h1 className="category-title">{props.title}</h1>
		</div>
	);
}
