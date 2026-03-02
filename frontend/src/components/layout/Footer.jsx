import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Animate the footer columns staggering in
      gsap.fromTo(".footer-col",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: comp.current,
            start: "top 90%", // Triggers when footer is 90% in view
            toggleActions: "play none none none"
          }
        }
      );

      // Fade in the bottom copyright bar slightly after the columns
      gsap.fromTo(".footer-bottom",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: comp.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        },
        "+=0.5"
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <footer ref={comp} className="bg-[#05080f] pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
      
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c2a353]/30 to-transparent"></div>

      {/* Subtle background ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#c2a353]/5 rounded-full blur-[150px] translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="footer-col opacity-0 lg:pr-8">
            <h2 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fceebb] via-[#e4cc76] to-[#c2a353] mb-6 tracking-widest uppercase drop-shadow-sm inline-block">
              Nari Astra
            </h2>
            <p className="text-gray-400 text-[14px] leading-[1.8] font-light mb-8">
              Empowerment in your hand. An innovative, luxurious, and powerful self-defense spray designed for the modern woman.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c2a353] hover:bg-[#c2a353]/10 hover:border-[#c2a353]/40 transition-all duration-300">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c2a353] hover:bg-[#c2a353]/10 hover:border-[#c2a353]/40 transition-all duration-300">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c2a353] hover:bg-[#c2a353]/10 hover:border-[#c2a353]/40 transition-all duration-300">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col opacity-0">
            <h3 className="text-white font-medium text-[15px] mb-6 tracking-widest uppercase">
              Explore
            </h3>
            <ul className="space-y-4 text-[14px] text-gray-400 font-light">
              <li>
                <Link to="/" className="hover:text-[#c2a353] transition-colors duration-300 relative group inline-block">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c2a353] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-[#c2a353] transition-colors duration-300 relative group inline-block">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c2a353] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-[#c2a353] transition-colors duration-300 relative group inline-block">
                  Our Story
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c2a353] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#c2a353] transition-colors duration-300 relative group inline-block">
                  Shop
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c2a353] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col opacity-0">
            <h3 className="text-white font-medium text-[15px] mb-6 tracking-widest uppercase">
              Support
            </h3>
            <ul className="space-y-4 text-[14px] text-gray-400 font-light">
              <li>
                <Link to="/contact" className="hover:text-[#c2a353] transition-colors duration-300 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#c2a353] transition-colors duration-300 inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-[#c2a353] transition-colors duration-300 inline-block">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#c2a353] transition-colors duration-300 inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col opacity-0">
            <h3 className="text-white font-medium text-[15px] mb-6 tracking-widest uppercase">
              Stay In The Loop
            </h3>
            <p className="text-gray-400 text-[13px] leading-[1.6] font-light mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-white/20 pb-3 text-gray-200 text-[14px] font-light focus:outline-none focus:border-[#c2a353] transition-colors duration-300 placeholder:text-gray-600"
                required
              />
              <button 
                type="submit" 
                className="absolute right-0 bottom-3 text-gray-400 hover:text-[#c2a353] transition-transform duration-300 hover:translate-x-1"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom opacity-0 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[12px] font-light tracking-wide">
            &copy; {new Date().getFullYear()} Nari Astra. All rights reserved.
          </p>
          <div className="flex gap-6 text-[12px] text-gray-500 font-light tracking-wide">
            <Link to="/terms" className="hover:text-[#c2a353] transition-colors duration-300">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-[#c2a353] transition-colors duration-300">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;