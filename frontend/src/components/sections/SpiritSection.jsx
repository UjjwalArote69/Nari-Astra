import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SpiritSection = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create a timeline connected to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          start: "top 75%", // Starts when the top of this section hits 75% of the viewport
          toggleActions: "play none none none", // Only play once
        }
      });

      // 1. Stagger the 4 masonry images upwards
      tl.fromTo(".spirit-img", 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      )
      // 2. Stagger the text elements (Title, Subtitle, Paragraphs, Button)
      .fromTo(".spirit-text",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.8" // Start while the images are still animating in
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section id="story" ref={comp} className="py-24 md:py-32 px-6 md:px-12 bg-[#05080f] relative overflow-hidden">
      
      {/* Subtle background ambient glow behind the grid */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#c2a353]/5 rounded-full blur-[120px] -translate-y-1/2 -z-10 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center z-10">
        
        {/* IMAGE GRID - True Editorial Masonry */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 relative group">
          
          {/* Column 1 - Pushed down for stagger */}
          <div className="flex flex-col gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="spirit-img opacity-0 overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
                alt="Professional woman" 
                className="object-cover w-full aspect-[3/4] hover:scale-110 transition-transform duration-1000 ease-out" 
              />
            </div>
            <div className="spirit-img opacity-0 overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                alt="Elegant portrait" 
                className="object-cover w-full aspect-square md:aspect-[4/3] hover:scale-110 transition-transform duration-1000 ease-out" 
              />
            </div>
          </div>
          
          {/* Column 2 - Starts at top */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="spirit-img opacity-0 overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1580828369066-681966a34c1b?q=80&w=600&auto=format&fit=crop" 
                alt="Woman walking" 
                className="object-cover w-full aspect-square md:aspect-[4/3] hover:scale-110 transition-transform duration-1000 ease-out" 
              />
            </div>
            <div className="spirit-img opacity-0 overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop" 
                alt="Determined woman" 
                className="object-cover w-full aspect-[3/4] hover:scale-110 transition-transform duration-1000 ease-out" 
              />
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col justify-center max-w-xl pl-0 lg:pl-8">
          <h2 className="spirit-text opacity-0 text-4xl md:text-[46px] font-serif text-[#e4cc76] mb-6 tracking-wide drop-shadow-sm leading-tight">
            The Spirit of Nari Astra
          </h2>
          
          <h3 className="spirit-text opacity-0 text-xl md:text-[22px] text-white font-medium mb-10 leading-[1.4] tracking-wide">
            More than just protection, a tribute to <br className="hidden md:block" />quiet bravery
          </h3>
          
          <div className="space-y-8 text-gray-300 text-[14px] md:text-[15px] leading-[1.8] font-light">
            <p className="spirit-text opacity-0">
              The brand identity is built with high quality components, providing discreet carrying mechanisms and unwavering stopping power to empower and protect women.
            </p>
            
            {/* Added a subtle left border to create an editorial "quote" feel */}
            <div className="spirit-text opacity-0 relative pl-6 border-l-[1.5px] border-[#c2a353]/40">
              <h4 className="text-white font-medium text-[15px] mb-2 tracking-wide">
                Inspired by real stories, crafted with grace
              </h4>
              <p className="text-gray-400">
                An innovative, luxurious, powerful self-defense spray for the modern woman.
              </p>
            </div>
          </div>

          {/* Added Call to Action Button to anchor the section */}
          <div className="spirit-text opacity-0 mt-12">
            <Link to="/story">
            <button className="bg-gradient-to-b from-[#e8cf9c] to-[#99762a] text-[#111] font-bold text-[12px] md:text-[13px] py-3.5 px-10 rounded-full uppercase tracking-[0.15em] transition-all shadow-[0_0_30px_rgba(196,161,84,0.2)] hover:shadow-[0_0_40px_rgba(196,161,84,0.5)] border-[1px] border-[#fceebb]/40 hover:scale-105">
              Read Our Story
            </button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SpiritSection;