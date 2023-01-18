import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Fundraising from './Container/Fundraising/Fundraising';
import Hiring from './Container/Hiring/Hiring';
import IntroSection from './Container/introSection/introSection';
import Mission from './Container/Mission/Mission';
import PartnerSection from './Container/PartnerSection/PartnerSection';
import Testimonial from './Container/Testimonial/Testimonial';

function App() {
  return (
    <div className="App">
      <Header />
      <IntroSection />
      <PartnerSection />
      <Fundraising />
      <Testimonial />
      <Hiring />
      <Mission />
      <Footer />
    </div>
  );
}

export default App;