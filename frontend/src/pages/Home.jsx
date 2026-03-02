import React from 'react';
import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer'; (Create this similar to Navbar)
import Hero from '../components/sections/Hero';
import FeatureShowcase from '../components/sections/FeatureShowcase';
import SpiritSection from '../components/sections/SpiritSection';
import ValuesAndFAQ from '../components/sections/ValuesAndFAQ';
import Testimonials from '../components/sections/Testimonials';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#05080f] font-sans text-gray-200">
      <main>
        <Hero />
        <FeatureShowcase />
        <SpiritSection />
        <ValuesAndFAQ/>
        <Testimonials/>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;