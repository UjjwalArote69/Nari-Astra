/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react"; 
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 1. Add Hydration State
  const [isHydrated, setIsHydrated] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  // Get state from useAuthStore
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  // 2. Hydration Effect: Ensures the component re-renders once localStorage is read
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Our Story", path: "/story" },
    { name: "Safety", path: "/safety" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black/90 via-black/70 to-transparent transition-all duration-300">
      {/* Main Navbar Container */}
      <div className="px-6 md:px-12 py-4 md:py-6 flex items-center justify-between relative z-50">
        
        {/* Left Side: Mobile Toggle & Brand Logo */}
        <div className="flex items-center flex-1">
          {/* Mobile Hamburger Menu Button */}
          <button 
            className="md:hidden text-gray-200 hover:text-[#d4b982] transition-colors mr-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
          
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex justify-center flex-none space-x-8 text-[15px] font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`relative py-1 transition-colors ${
                isActive(link.path) ? "text-[#d4b982]" : "text-gray-200 hover:text-[#d4b982]"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute left-0 right-0 -bottom-[2px] h-[1.5px] bg-[#d4b982]"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Side: Auth & Cart */}
        <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
          
          {/* 3. Wrap Auth Toggle in Hydration Check to prevent flickering */}
          {isHydrated && (
            <>
              {!isLoggedIn ? (
                <div className="flex items-center gap-3 md:gap-4">
                  <Link to="/login" className="hidden sm:block text-gray-200 text-[13px] hover:text-[#d4b982] uppercase tracking-widest font-medium">
                    Login
                  </Link>
                  <Link to="/register">
                    <button className="bg-gradient-to-b from-[#e8cf9c] via-[#c4a154] to-[#99762a] text-[#111] font-bold text-[10px] py-2 px-4 md:px-5 rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(196,161,84,0.3)]">
                      Register
                    </button>
                  </Link>
                </div>
              ) : (
                <Link to="/profile" className="text-gray-200 hover:text-[#d4b982] flex items-center gap-2 group">
                  <span className="hidden sm:inline text-[13px] uppercase tracking-widest font-medium">Profile</span>
                  <div className="w-8 h-8 rounded-full bg-[#d4b982]/10 border border-[#d4b982]/30 flex items-center justify-center group-hover:border-[#d4b982]/60 transition-all">
                    <User size={16} className="text-[#d4b982]" />
                  </div>
                </Link>
              )}
            </>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-200 hover:text-[#d4b982] transition-colors pl-2">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4b982] text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 5. Mobile Menu Full-Screen Overlay */}
      <div
        className={`fixed inset-0 bg-[#05080f]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-2xl font-serif tracking-widest uppercase transition-colors ${
              isActive(link.path)
                ? "text-[#d4b982]"
                : "text-gray-300 hover:text-[#d4b982]"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;