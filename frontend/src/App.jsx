import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import ScrollToTop from './components/layout/ScrollToTop';

import Home from './pages/Home';
import Features from './pages/Features';
import Story from './pages/Story';
import Safety from './pages/Safety';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { isLoggedIn } = useAuthStore();
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <Router>
      {isAppLoading && <Loader onComplete={() => setIsAppLoading(false)} />}

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
            
            {/* Auth Routes with Protection */}
            <Route path='/register' element={!isLoggedIn ? <Register/> : <Navigate to="/profile" />}/>
            <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to="/profile" />}/>
            <Route path='/profile' element={isLoggedIn ? <Profile/> : <Navigate to="/login" />}/>
            <Route path='/cart' element={<Cart/>}/>
            
            {/* Catch-all 404 */}
            <Route path="*" element={<div className="pt-40 text-center text-white">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;