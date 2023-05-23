// import HomeCarousel from '../../components/HomeCarousel';
// import HomeCards from '../../components/CardGrid';
import IntroSection from "./Components/introSection/introSection";
import PartnerSection from "./Components/PartnerSection/PartnerSection";
import Fundraising from "./Components/Fundraising/Fundraising";
import Testimonial from "./Components/Testimonial/Testimonial";
import Hiring from "./Components/Hiring/Hiring";
import Mission from "./Components/Mission/Mission";

export default function Home() {
	return (
		<div className="Home">
			{/* <HomeCarousel /> */}
			{/* <HomeCards /> */}

			<IntroSection />
			<PartnerSection />
			<Fundraising />
			<Testimonial />
			<Hiring />
			<Mission />
		</div>
	);
}
