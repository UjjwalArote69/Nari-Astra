/* eslint-disable react-hooks/set-state-in-effect */
import React, {
  useState,
  useEffect,
} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  // Close the mobile menu automatically when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "unset";
    }
    return () => {
      document.body.style.overflow =
        "unset";
    };
  }, [isMobileMenuOpen]);

  // Helper function to check active state
  const isActive = (path) =>
    location.pathname === path;

  // Centralized navigation links for cleaner code
  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Features",
      path: "/features",
    },
    {
      name: "Our Story",
      path: "/story",
    },
    { name: "Safety", path: "/safety" },
    { name: "Shop", path: "/shop" },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <nav className="fixed w-full z-50 px-6 md:px-12 py-6 md:py-8 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent">
      {/* 1. Mobile Hamburger Menu (Hidden on Desktop) */}
      <div className="flex-1 md:hidden relative z-50">
        <button
          onClick={() =>
            setIsMobileMenuOpen(
              !isMobileMenuOpen,
            )
          }
          className="text-gray-200 hover:text-[#d4b982] transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X
              size={28}
              strokeWidth={1.5}
            />
          ) : (
            <Menu
              size={28}
              strokeWidth={1.5}
            />
          )}
        </button>
      </div>

      {/* 2. Left invisible spacer (Desktop Only) */}
      <div className="hidden md:block flex-1"></div>

      {/* 3. Centered Navigation Links (Desktop Only) */}
      <div className="hidden md:flex space-x-6 lg:space-x-8 text-[14px] lg:text-[15px] font-medium tracking-wide">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`relative transition-colors ${isActive(link.path) ? "text-[#d4b982]" : "text-gray-200 hover:text-[#d4b982]"}`}
          >
            {link.name}
            {isActive(link.path) && (
              <span className="absolute left-0 right-0 -bottom-[6px] h-[1.5px] bg-[#d4b982]"></span>
            )}
          </Link>
        ))}
      </div>

      {/* 4. Right Cart & User Icons */}
      <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6 relative z-50">
        <Link to="/register">
                    <button 
                      className="bg-gradient-to-b from-[#e8cf9c] via-[#c4a154] to-[#99762a] text-[#111] font-bold text-[12px] md:text-[10px] py-2.5 px-6 rounded-full uppercase tracking-[0.15em] transition-all shadow-[0_0_30px_rgba(196,161,84,0.4)] hover:shadow-[0_0_50px_rgba(196,161,84,0.7)] border-[1px] border-[#fceebb]/50 hover:scale-105">
                      Register
                    </button>
                    
                    </Link>
        <Link
          to="/cart"
          className="relative cursor-pointer hover:text-[#d4b982] text-gray-200 transition-colors flex items-center"
        >
          <ShoppingCart
            size={24}
            strokeWidth={1.5}
          />
          <span className="absolute -top-1.5 -right-3.5 bg-[#d4b982] text-black text-[11px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center">
            0
          </span>
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
