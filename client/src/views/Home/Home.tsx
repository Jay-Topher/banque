import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import FirstSection from '../../Components/FirstSection/FirstSection';
import SecondSection from '../../Components/SecondSection/SecondSection';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <FirstSection />
      <SecondSection />
    </div>
  );
};

export default Home;
