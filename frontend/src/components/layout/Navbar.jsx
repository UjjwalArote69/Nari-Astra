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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
    <nav className="fixed w-full z-50 px-6 md:px-12 py-6 md:py-8 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent">
      {/* ... (Mobile Hamburger Menu remains same) ... */}

      <div className="hidden md:block flex-1"></div>

      <div className="hidden md:flex space-x-8 text-[15px] font-medium tracking-wide">
        {navLinks.map((link) => (
          <Link key={link.name} to={link.path} className={`relative transition-colors ${isActive(link.path) ? "text-[#d4b982]" : "text-gray-200 hover:text-[#d4b982]"}`}>
            {link.name}
            {isActive(link.path) && <span className="absolute left-0 right-0 -bottom-[6px] h-[1.5px] bg-[#d4b982]"></span>}
          </Link>
        ))}
      </div>

      <div className="flex-1 flex justify-end items-center space-x-6 relative z-50">
        {/* 3. Wrap Auth Toggle in Hydration Check to prevent flickering */}
        {isHydrated && (
          <>
            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-200 text-[13px] hover:text-[#d4b982] uppercase tracking-widest font-medium">
                  Login
                </Link>
                <Link to="/register">
                  <button className="bg-gradient-to-b from-[#e8cf9c] via-[#c4a154] to-[#99762a] text-[#111] font-bold text-[10px] py-2 px-5 rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(196,161,84,0.4)]">
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

        <Link to="/cart" className="relative text-gray-200 hover:text-[#d4b982] transition-colors">
          <ShoppingCart size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#d4b982] text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
      {/* 5. Mobile Menu Full-Screen Overlay */}
      <div
        className={`fixed inset-0 bg-[#05080f]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 md:hidden transition-all duration-500 ease-in-out ${
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
