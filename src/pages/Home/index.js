// import HomeCarousel from '../../components/HomeCarousel';
// import HomeCards from '../../components/CardGrid';
import IntroSection from '../../pages/introSection/introSection';
import PartnerSection from '../../pages/PartnerSection/PartnerSection';
import Fundraising from '../../pages/Fundraising/Fundraising';
import Testimonial from '../../pages/Testimonial/Testimonial';
import Hiring from '../../pages/Hiring/Hiring';
import Mission from '../../pages/Mission/Mission';


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
