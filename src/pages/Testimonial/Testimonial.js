import React from "react";
import { Card, Container } from "react-bootstrap";
import Slider from "react-slick";
import Testi1 from "../../assets/home-images/testimonial_img1.png";
// import Testi2 from "../../assets/home-images/testimonial_img2.png";
// import Testi3 from "../../assets/home-images/testimonial_img3.png";
import "./Testimonial.css";

const Testimonial = () => {
	const settings = {
		dots: false,
		infinite: true,
		arrows: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="testimonial_main">
			<h1>Testimonial</h1>

			<Container>
				<div className="main_testimonial_slider">
					<Slider {...settings}>
						<div>
							<Card>
								<Card.Body>
									<Card.Title>Great experience!</Card.Title>
									<Card.Text>
										Rare Fnd is a great platform for anyone looking to support
										sustainable development in their community. It's easy to
										use, has a great user interface, and the crowdfunding
										campaigns are inspiring and effective. I've had the pleasure
										of working with them and can vouch for the impact they have
										had in my community. I highly recommend everyone to try out
										Rare Fnd Crowdfunding platform - you won't be disappointed!
									</Card.Text>

									<div className="testimonial_div">
										<img src={Testi1} alt="testimonial" />

										<div className="mx-2">
											<h6>Korol Mutebi Bashir</h6>
											<p>Charity Director</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
						{/* <div>
							<Card>
								<Card.Body>
									<Card.Title>Awesome !!!!</Card.Title>
									<Card.Text>
										There’s no other program that walks you through exactly what
										you need to know to start an online store fast, written by
										someone who has built several 7-figure ecommerce businesses
										from scratch.
									</Card.Text>

									<div className="testimonial_div">
										<img src={Testi2} alt="testimonial" />

										<div className="mx-2">
											<h6>Anna Gates</h6>
											<p>Web Designer</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
						<div>
							<Card>
								<Card.Body>
									<Card.Title>Super Helpfull !!</Card.Title>
									<Card.Text>
										There’s no other program that walks you through exactly what
										you need to know to start an online store fast, written by
										someone who has built several 7-figure ecommerce businesses
										from scratch.
									</Card.Text>

									<div className="testimonial_div">
										<img src={Testi1} alt="testimonial" />

										<div className="mx-2">
											<h6>Anna Gates</h6>
											<p>Web Designer</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
						<div>
							<Card>
								<Card.Body>
									<Card.Title>Great Support !!!!</Card.Title>
									<Card.Text>
										There’s no other program that walks you through exactly what
										you need to know to start an online store fast, written by
										someone who has built several 7-figure ecommerce businesses
										from scratch.
									</Card.Text>

									<div className="testimonial_div">
										<img src={Testi3} alt="testimonial" />

										<div className="mx-2">
											<h6>Anna Gates</h6>
											<p>Web Designer</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div> */}
					</Slider>
				</div>
			</Container>
		</div>
	);
};

export default Testimonial;
