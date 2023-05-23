import React from "react";
import { Card, Container } from "react-bootstrap";
import Slider from "react-slick";
import Testi1 from "../../../../assets/home-images/testimonial_img1.png";
import { useTranslation } from "react-i18next";
import "./Testimonial.css";

const Testimonial = () => {
	const { t } = useTranslation();

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
			<h1>{t("home.testimonials.title")}</h1>

			<Container>
				<div className="main_testimonial_slider">
					<Slider {...settings}>
						<div>
							<Card>
								<Card.Body>
									<Card.Title>{t("home.testimonials.1.title")}</Card.Title>
									<Card.Text>{t("home.testimonials.1.paragraph")}</Card.Text>

									<div className="testimonial_div">
										<img src={Testi1} alt="testimonial" />

										<div className="mx-2">
											<h6>Korol Mutebi Bashir</h6>
											<p>{t("home.testimonials.1.testimonyPosition")}</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
					</Slider>
				</div>
			</Container>
		</div>
	);
};

export default Testimonial;
