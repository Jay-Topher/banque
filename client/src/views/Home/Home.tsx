import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import FirstSection from '../../Components/FirstSection/FirstSection';
import SecondSection from '../../Components/SecondSection/SecondSection';
import ThirdSection from '../../Components/ThirdSection/ThirdSection';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  );
};

export default Home;
