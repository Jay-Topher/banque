import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import FirstSection from '../../Components/FirstSection/FirstSection';
import SecondSection from '../../Components/SecondSection/SecondSection';
import ThirdSection from '../../Components/ThirdSection/ThirdSection';
import FeedBackSection from '../../Components/FeedBackSection/FeedBackSection';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FeedBackSection />
    </div>
  );
};

export default Home;
