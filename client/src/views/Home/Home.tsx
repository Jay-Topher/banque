import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import FirstSection from '../../Components/FirstSection/FirstSection';
import SecondSection from '../../Components/SecondSection/SecondSection';
import ThirdSection from '../../Components/ThirdSection/ThirdSection';
import FeedBackSection from '../../Components/FeedBackSection/FeedBackSection';
import Footer from '../../Components/Footer/Footer';
import HamburgerButton from '../../common/HamburgerMenu/HamburgerButton/HamburgerButton';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FeedBackSection />
      <Footer />
      <HamburgerButton open={true} />
    </div>
  );
};

export default Home;
