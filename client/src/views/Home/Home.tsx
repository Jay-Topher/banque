import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import FirstSection from '../../Components/FirstSection/FirstSection';
import SecondSection from '../../Components/SecondSection/SecondSection';
import ThirdSection from '../../Components/ThirdSection/ThirdSection';
import FeedBackSection from '../../Components/FeedBackSection/FeedBackSection';
import Footer from '../../Components/Footer/Footer';
import HamburgerButton from '../../common/HamburgerMenu/HamburgerButton/HamburgerButton';
import HamburgerNav from '../../common/HamburgerMenu/HamburgerNav/HamburgerNav';

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="home">
      <div>
        <HamburgerButton open={open} setOpen={() => setOpen(!open)} />
        <HamburgerNav open={open} />
      </div>
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FeedBackSection />
      <Footer />
    </div>
  );
};

export default Home;
