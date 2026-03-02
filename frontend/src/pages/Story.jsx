import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Page Header Animation (Loads immediately)
      gsap.fromTo(".story-header-el",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.1 }
      );

      // 2. The Origin Story Section
      const originTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".origin-section",
          start: "top 75%", // Triggers when top of section is 75% down the viewport
          toggleActions: "play none none none"
        }
      });

      // Image slides in slightly from the left
      originTl.fromTo(".origin-img",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      // Text elements slide up sequentially
      .fromTo(".origin-text-el",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.8" // Overlap with image animation
      );

      // 3. Pull Quote Section
      const quoteTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".quote-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      quoteTl.fromTo(".quote-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );

      // 4. Our Pillars Section
      gsap.fromTo(".pillar-card",
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pillars-section",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={comp} className="bg-[#05080f] min-h-screen pt-32 pb-0 font-sans text-gray-200 overflow-hidden">
      
      {/* 1. Page Header */}
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#c2a353]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <h2 className="story-header-el opacity-0 text-[#c2a353] text-[12px] uppercase tracking-[0.3em] font-medium mb-6">
          Our Genesis
        </h2>
        <h1 className="story-header-el opacity-0 text-5xl md:text-7xl font-serif text-[#e4cc76] mb-8 tracking-wide leading-tight drop-shadow-sm">
          Redefining <br className="hidden md:block" /> Personal Safety
        </h1>
        <p className="story-header-el opacity-0 text-gray-400 text-[16px] md:text-[18px] leading-[1.8] font-light max-w-2xl mx-auto">
          Nari Astra was born from a simple, undeniable truth: a woman's safety should never require her to compromise on her elegance, her style, or her confidence.
        </p>
      </section>

      {/* 2. The Origin Story (Split Layout) */}
      <section className="origin-section px-6 md:px-12 max-w-[1200px] mx-auto mb-32">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Image */}
          <div className="relative group">
            <div className="absolute -inset-4 border border-[#c2a353]/20 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
            <div className="origin-img opacity-0 h-[500px] lg:h-[650px] rounded-xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" 
                alt="Determined woman" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
          
          {/* Right: Text */}
          <div className="flex flex-col justify-center">
            <h3 className="origin-text-el opacity-0 text-3xl md:text-4xl font-serif text-white mb-8 leading-snug">
              The burden of safety <br /> shouldn't be ugly.
            </h3>
            <div className="space-y-6 text-gray-300 text-[15px] leading-[1.8] font-light">
              <p className="origin-text-el opacity-0">
                For decades, self-defense tools have been designed with purely utilitarian, often aggressive aesthetics. They look out of place in a designer handbag or an evening clutch. We noticed that because of this, many women were choosing to leave their protection at home.
              </p>
              <p className="origin-text-el opacity-0">
                We asked ourselves: What if we could engineer a defense spray that carries the highest stopping power legally permitted, but looks like a piece of high-end cosmetics? 
              </p>
              <p className="origin-text-el opacity-0">
                The answer was <span className="text-[#c2a353] font-serif italic text-[17px]">Nari Astra</span>—Sanskrit for a woman's weapon. A silent guardian crafted with grace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pull Quote Section */}
      <section className="quote-section bg-[#091020] py-32 px-6 border-y border-[#c2a353]/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Quote size={400} />
        </div>
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <Quote className="quote-anim opacity-0 text-[#c2a353] mx-auto mb-8" size={40} strokeWidth={1} />
          <h3 className="quote-anim opacity-0 text-3xl md:text-5xl font-serif text-[#e4cc76] leading-snug md:leading-tight mb-8">
            "True empowerment comes when you can move through the world with absolute peace of mind, without sacrificing your personal identity."
          </h3>
          <div className="quote-anim opacity-0 w-16 h-[1px] bg-[#c2a353] mx-auto mb-6"></div>
          <p className="quote-anim opacity-0 text-gray-400 text-[13px] uppercase tracking-[0.2em]">The Founders</p>
        </div>
      </section>

      {/* 4. Our Pillars (Three Columns) */}
      <section className="pillars-section py-32 px-6 md:px-12 max-w-[1200px] mx-auto">
        <h2 className="text-center text-[#c2a353] text-[12px] uppercase tracking-[0.3em] font-medium mb-16">
          Our Brand Pillars
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div className="pillar-card opacity-0 text-center group">
            <div className="w-16 h-16 mx-auto border border-[#c2a353]/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c2a353]/10 transition-colors duration-500">
              <span className="text-2xl font-serif text-[#e4cc76]">01</span>
            </div>
            <h4 className="text-white font-serif text-2xl mb-4">Discretion</h4>
            <p className="text-gray-400 text-[14px] leading-[1.8] font-light">
              Designed to blend seamlessly into your lifestyle, keeping your advantage hidden until the exact moment it is needed.
            </p>
          </div>
          
          <div className="pillar-card opacity-0 text-center group">
            <div className="w-16 h-16 mx-auto border border-[#c2a353]/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c2a353]/10 transition-colors duration-500">
              <span className="text-2xl font-serif text-[#e4cc76]">02</span>
            </div>
            <h4 className="text-white font-serif text-2xl mb-4">Efficacy</h4>
            <p className="text-gray-400 text-[14px] leading-[1.8] font-light">
              We never compromise on safety. Our internal mechanisms and chemical formulas meet the highest tactical standards.
            </p>
          </div>
          
          <div className="pillar-card opacity-0 text-center group">
            <div className="w-16 h-16 mx-auto border border-[#c2a353]/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c2a353]/10 transition-colors duration-500">
              <span className="text-2xl font-serif text-[#e4cc76]">03</span>
            </div>
            <h4 className="text-white font-serif text-2xl mb-4">Empowerment</h4>
            <p className="text-gray-400 text-[14px] leading-[1.8] font-light">
              We build tools that foster confidence, allowing women to reclaim their independence and walk fearlessly.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Story;