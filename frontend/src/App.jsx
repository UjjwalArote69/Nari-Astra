import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader'; // Import the new Loader

import Home from './pages/Home';
import Features from './pages/Features';
import Story from './pages/Story';
import Safety from './pages/Safety';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ScrollToTop from './components/layout/ScrollToTop';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  // State to control whether the initial loader is showing
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <Router>
      {/* 1. The Premium Initial Loader */}
      {isAppLoading && (
        <Loader onComplete={() => setIsAppLoading(false)} />
      )}

      {/* 2. Main App Content (Always rendered, but hidden behind loader initially) */}
      <div className="min-h-screen bg-[#05080f] font-sans text-gray-200 flex flex-col">
        <Navbar />
        <ScrollToTop/>
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/story" element={<Story />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            {/* Catch-all for 404 Not Found */}
            <Route path="*" element={<div className="pt-40 text-center text-white">404 - Page Not Found</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;