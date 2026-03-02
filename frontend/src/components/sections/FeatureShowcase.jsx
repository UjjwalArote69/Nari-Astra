import React, { useEffect, useRef } from 'react';
import { Briefcase, Lock, SprayCan } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Timeline for the Section Title & Bottle
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          start: "top 75%", 
          toggleActions: "play none none none",
        }
      });

      tl.fromTo(".feature-title", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(".feature-bottle",
        { y: 80, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
        "-=0.6"
      );

      // 2. Individual Text Block Animations (Perfect for Mobile Scrolling)
      // This grabs every feature block and gives it its own scroll trigger
      const featureBlocks = gsap.utils.toArray('.feature-block');
      
      featureBlocks.forEach((block) => {
        // Target the inner elements (.anim-el) to stagger them one by one
        const textElements = block.querySelectorAll('.anim-el');
        
        gsap.fromTo(textElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2, // Staggers: Icon -> Heading -> Paragraph -> Line
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%", // Triggers precisely when THIS block enters view
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 3. Continuous Bottle Float
      gsap.to(".feature-bottle-img", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2 
      });

    }, comp);

    return () => ctx.revert(); 
  }, []);

  return (
    <section id="features" ref={comp} className="py-32 px-8 bg-[#1e1e1e] overflow-hidden">
      <div className="max-w-275 mx-auto">
        <h2 className="feature-title opacity-0 text-4xl md:text-5xl font-serif text-center text-[#c2a353] mb-28 tracking-wide">
          Feature Showcase
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
          
          {/* LEFT FEATURES */}
          <div className="space-y-32 text-right flex flex-col items-end relative z-10">
            
            {/* Compact Design */}
            <div className="feature-block max-w-70 relative">
              <div className="anim-el opacity-0 flex justify-end mb-4">
                <Briefcase className="text-[#c2a353]" size={36} strokeWidth={1} />
              </div>
              <h3 className="anim-el opacity-0 text-white font-serif text-[20px] mb-3">Compact Design</h3>
              <p className="anim-el opacity-0 text-gray-400 text-[17px] leading-relaxed">
                Compact body fits seamlessly in purses, ensuring protection without compromising style.
              </p>
              
              {/* SVG Connecting Line */}
              <div className="anim-el opacity-0 hidden md:block absolute left-full top-6 ml-4">
                <svg width="90" height="10" className="overflow-visible">
                  <path d="M 0 0 L 90 0" fill="none" stroke="#c2a353" strokeWidth="1" />
                  <circle cx="0" cy="0" r="3" fill="#1e1e1e" stroke="#c2a353" strokeWidth="1.5" />
                  <circle cx="90" cy="0" r="3" fill="#c2a353" />
                </svg>
              </div>
            </div>

            {/* Safety Lock */}
            <div className="feature-block max-w-70 relative">
              <div className="anim-el opacity-0 flex justify-end mb-4">
                <Lock className="text-[#c2a353]" size={36} strokeWidth={1} />
              </div>
              <h3 className="anim-el opacity-0 text-white font-serif text-[20px] mb-2">Safety Lock</h3>
              <p className="anim-el opacity-0 text-gray-400 text-[17px] leading-relaxed">
                Advanced safety lock prevents accidental discharge, giving you complete confidence on the go.
              </p>
              
              {/* SVG Connecting Line */}
              <div className="anim-el opacity-0 hidden md:block absolute left-full top-6 ml-4">
                <svg width="90" height="10" className="overflow-visible">
                  <path d="M 0 0 L 90 0" fill="none" stroke="#c2a353" strokeWidth="1" />
                  <circle cx="0" cy="0" r="3" fill="#1e1e1e" stroke="#c2a353" strokeWidth="1.5" />
                  <circle cx="90" cy="0" r="3" fill="#c2a353" />
                </svg>
              </div>
            </div>
            
          </div>

          {/* CENTER PRODUCT */}
          <div className="feature-bottle opacity-0 flex justify-center relative z-20">
            <img 
              src="/spray/nari-astra-spray.png" 
              alt="Nari Astra Spray Features" 
              className="feature-bottle-img h-[400px] md:h-137.5 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* RIGHT FEATURES */}
          <div className="text-left relative z-10 flex flex-col justify-center mt-32 md:mt-0">
            
            {/* Powerful Range */}
            <div className="feature-block max-w-70 relative">
              <div className="anim-el opacity-0 flex justify-start mb-4">
                <SprayCan className="text-[#c2a353]" size={36} strokeWidth={1} />
              </div>
              <h3 className="anim-el opacity-0 text-white font-serif text-[20px] mb-3">Powerful Range</h3>
              <p className="anim-el opacity-0 text-gray-400 text-[17px] leading-relaxed">
                Sprays an exact stream hitting targets at distances safely, neutralizing threats instantly.
              </p>
              
              {/* SVG Connecting Line */}
              <div className="anim-el opacity-0 hidden md:block absolute right-full top-6 mr-4">
                <svg width="120" height="120" className="overflow-visible">
                  <path d="M 120 0 L 80 0 L 30 -75 L -10 -75" fill="none" stroke="#c2a353" strokeWidth="1" />
                  <circle cx="120" cy="0" r="3" fill="#1e1e1e" stroke="#c2a353" strokeWidth="1.5" />
                  <circle cx="-10" cy="-75" r="3" fill="#c2a353" />
                </svg>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;