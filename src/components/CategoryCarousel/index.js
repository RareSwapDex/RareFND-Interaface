import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

export default function CategoryCarousel(props) {
	return (
		<Carousel fade controls={false} indicators={false}>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={props.image}
					alt="Third slide"
					style={{
						height: `50${window.innerHeight > window.innerWidth ? "vw" : "vh"}`,
						objectFit: "cover",
						filter: "blur(3px)",
						webkitFilter: "blur(3px)",
					}}
				/>
				<Carousel.Caption className="carousel-caption">
					<h1
						className="display-1"
						style={{
							color: "white",
							fontSize: "6rem",
							fontWeight: "700",
						}}
					>
						{props.title}
					</h1>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
