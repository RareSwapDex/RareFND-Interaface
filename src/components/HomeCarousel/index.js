import Carousel from "react-bootstrap/Carousel";
import main from "../../assets/carousel/main.jpeg";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./index.css";

export default function HomeCarousel() {
	return (
		<Carousel fade controls={false} indicators={false}>
			<Carousel.Item>
				<div
					className="d-block w-100"
					alt="Third slide"
					style={{
						height: "92vh",
						minHeight: "600px",
						objectFit: "cover",
					}}
				/>

				<Carousel.Caption
					className="top-caption"
					style={{ position: "absolute", top: "80px" }}
				>
					<h1 className="h1" style={{fontSize:'4rem',color:"#3d3d3d",fontWeight:"500"}}>
					Rare Find Then Fund
					</h1>
					<br />
					<br />
					<p style={{color: '#3d3d3d',lineHeight:'1.8',fontSize: '1.125rem'}}>
						The only crowdfunding platform that pays YOU to start your
						fundraising journey! For a limited time only kickstart your campaign
						with 10% completely free to help your reach your target!
					</p>
					<br />
					<br />
					
					<Button variant="warning" className="buttonhome" size="lg" style={{fontFamily:"'Poppins', sans-serif",color: "#1b1b1b",height: "3.7rem",fontSize:"1.4rem",minHeight:"3rem",padding: "0.5rem 2rem",borderRadius:"0.75rem"}}>
						<strong>Sign up</strong> - it's Free
					</Button>
					<br />
					<p style={{color: "#3d3d3d"}}>
						Or, <Link to="/start-project" style={{lineHeight:'3',textDecoration:"underline",color: "#3d3d3d"}}>Start a project!</Link>
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
